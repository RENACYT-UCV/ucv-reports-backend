import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { nombre, apellido_paterno, apellido_materno, contraseña, id_cargo } =
      createUsuarioDto;

    // Generate username
    const nombre_usuario = `${nombre.toLowerCase().replace(/ /g, '')}${apellido_paterno.substring(0, 1).toLowerCase()}${apellido_materno.substring(0, 1).toLowerCase()}`;

    // Hash password
    const hashed_password = await bcrypt.hash(contraseña, 10);

    // Check if user already exists
    const existingUser = await this.usuarioRepository.findOne({
      where: { usuario: nombre_usuario },
    });
    if (existingUser) {
      throw new ConflictException(
        'Ya existe un usuario con el mismo nombre de usuario. Intenta con poner primero tu segundo nombre.',
      );
    }

    const usuario = this.usuarioRepository.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      usuario: nombre_usuario,
      contraseña: hashed_password,
      id_cargo,
      Estado: 'Habilitado', // Set initial state as 'Habilitado'
    });

    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findEnabledUsers(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { Estado: 'Habilitado' },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { IDUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (updateUsuarioDto.contraseña) {
      updateUsuarioDto.contraseña = await bcrypt.hash(
        updateUsuarioDto.contraseña,
        10,
      );
    }
    this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }

  async disable(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { IDUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    usuario.Estado = 'Deshabilitado';
    return this.usuarioRepository.save(usuario);
  }

  async enable(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { IDUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    usuario.Estado = 'Habilitado';
    return this.usuarioRepository.save(usuario);
  }

  async obtenerUsuariosEliminados(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { Estado: 'Deshabilitado' },
    });
  }
  async findByUsername(usuario: string): Promise<Usuario | undefined> {
    const user = await this.usuarioRepository.findOne({
      where: { usuario },
      relations: ['cargo'], // Load the 'cargo' relation
    });
    return user || undefined;
  }

  async findByRole(id_cargo: number): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { id_cargo, Estado: 'Habilitado' },
    });
  }

  async findByPartialUsername(usuario: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { usuario: Like(`%${usuario}%`) },
      relations: ['cargo'],
    });
  }

  getUsuarioRepository(): Repository<Usuario> {
    return this.usuarioRepository;
  }
}
