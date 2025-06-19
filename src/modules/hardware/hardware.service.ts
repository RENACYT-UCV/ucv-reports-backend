import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hardware } from './entities/hardware.entity';
import {
  CreateHardwareDto,
  CreateMultipleHardwareDto,
} from './dto/create-hardware.dto';
import { UpdateHardwareLocationDto } from './dto/update-hardware.dto';

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware)
    private readonly hardwareRepository: Repository<Hardware>,
  ) {}

  async marcarComoHabilitado(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    hardware.Estado = 'Habilitado';
    return this.hardwareRepository.save(hardware);
  }

  async marcarComoDescompuesto(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    hardware.Estado = 'Descompuesto';
    return this.hardwareRepository.save(hardware);
  }

  async findOneById(id_hardware: number): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    return hardware;
  }

  async findAll(): Promise<Hardware[]> {
    return this.hardwareRepository.find();
  }

  async create(createHardwareDto: CreateHardwareDto): Promise<Hardware> {
    const hardware = this.hardwareRepository.create(createHardwareDto);
    return this.hardwareRepository.save(hardware);
  }

  async actualizarUbicacion(
    id_hardware: number,
    updateHardwareLocationDto: UpdateHardwareLocationDto,
  ): Promise<Hardware> {
    const hardware = await this.hardwareRepository.findOne({
      where: { id_hardware },
    });
    if (!hardware) {
      throw new NotFoundException('Hardware no encontrado');
    }
    hardware.idpabellon = updateHardwareLocationDto.idpabellon;
    hardware.idpiso = updateHardwareLocationDto.idpiso;
    hardware.idsalon = updateHardwareLocationDto.idsalon;
    hardware.Estado = 'Habilitado';
    return this.hardwareRepository.save(hardware);
  }

  async createMultiple(
    createMultipleHardwareDto: CreateMultipleHardwareDto,
  ): Promise<Hardware[]> {
    const {
      id_articulo,
      codigo_inicial,
      nombre_producto,
      precio_producto,
      imagen_producto,
      cantidad_registros,
      estado_producto,
      idpabellon,
      idpiso,
      idsalon,
    } = createMultipleHardwareDto;

    const createdHardwares: Hardware[] = [];

    for (let i = 0; i < cantidad_registros; i++) {
      const codigo_actual = this.incrementCode(codigo_inicial, i);

      const hardware = this.hardwareRepository.create({
        Codigo: codigo_actual,
        nombre: nombre_producto,
        Estado: estado_producto,
        Precio: precio_producto,
        idpabellon: idpabellon,
        idpiso: idpiso,
        idsalon: idsalon,
        idarticulostipo: id_articulo,
        imagen: imagen_producto,
      });
      createdHardwares.push(await this.hardwareRepository.save(hardware));
    }
    return createdHardwares;
  }

  private incrementCode(initialCode: string, increment: number): string {
    const match = initialCode.match(/(\d+)$/);
    if (match) {
      const numPart = parseInt(match[1], 10);
      const newNum = numPart + increment;
      const numLength = match[1].length;
      return (
        initialCode.substring(0, match.index) +
        String(newNum).padStart(numLength, '0')
      );
    }
    return initialCode + increment; // Fallback if no number found
  }

  async getLatestCode(id_articulo: number): Promise<{ codigo: string }> {
    const result = await this.hardwareRepository
      .createQueryBuilder('hardware')
      .select('MAX(hardware.Codigo)', 'ultimo_codigo')
      .where('hardware.idarticulostipo = :id_articulo', { id_articulo })
      .getRawOne();

    let ultimo_codigo = result ? result.ultimo_codigo : null;

    if (ultimo_codigo === null) {
      // Generar el primer código con todos los ceros necesarios
      ultimo_codigo = 'A' + '0'.repeat(10) + '1'; // Ejemplo: A00000000001 (12 caracteres en total)
    } else {
      const match = ultimo_codigo.match(/([A-Z]+)(\d+)/);
      if (match) {
        const prefix = match[1];
        let numPart = parseInt(match[2], 10);
        numPart++;
        const numLength = match[2].length;
        ultimo_codigo = prefix + String(numPart).padStart(numLength, '0');
      } else {
        // Fallback si el formato no coincide, simplemente incrementa el número
        ultimo_codigo = ultimo_codigo + '1';
      }
    }

    return { codigo: ultimo_codigo };
  }

  async mostrarTablaArticulos(idArticuloTipo: number): Promise<Hardware[]> {
    return this.hardwareRepository
      .createQueryBuilder('h')
      .select([
        'h.id_hardware',
        'h.Codigo',
        'h.nombre',
        'h.Estado',
        'h.Precio',
        'a.nombre AS tipo_articulo',
      ])
      .innerJoin(
        'articulos_actual_uso',
        'a',
        'h.idarticulostipo = a.id_articulo',
      )
      .where('h.idarticulostipo = :idArticuloTipo', { idArticuloTipo })
      .andWhere("h.Estado = 'Descompuesto'")
      .getRawMany();
  }

  async obtenerEntradaProductos() {
    const productos = await this.hardwareRepository
      .createQueryBuilder('h')
      .select([
        'h.id_hardware',
        'h.Codigo',
        'h.nombre',
        'h.Estado',
        'h.Precio',
        'h.imagen',
        'h.idarticulostipo',
        'a.id_articulo',
        'a.nombre AS tipo_articulo',
        'a.LinkCompra',
      ])
      .innerJoin(
        'articulos_actual_uso',
        'a',
        'h.idarticulostipo = a.id_articulo',
      )
      .where("h.Estado = 'Pendiente'")
      .getRawMany();

    // Agrupar por tipo de artículo
    const productosPorTipo: Record<number, any> = {};
    for (const row of productos) {
      const id_articulo_tipo = row['h_idarticulostipo'];
      if (!productosPorTipo[id_articulo_tipo]) {
        productosPorTipo[id_articulo_tipo] = {
          nombre: row['a_nombre'],
          cantidad: 0,
          representacion: null,
          link_compra: row['a_LinkCompra'],
        };
      }
      productosPorTipo[id_articulo_tipo].cantidad++;
      if (!productosPorTipo[id_articulo_tipo].representacion) {
        productosPorTipo[id_articulo_tipo].representacion = row;
      }
    }
    // Convertir a array para respuesta
    return Object.values(productosPorTipo);
  }
}
