import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get('habilitados')
  findEnabledUsers(): Promise<Usuario[]> {
    return this.usuariosService.findEnabledUsers();
  }

  @Get('eliminados')
  async obtenerUsuariosEliminados(): Promise<Usuario[]> {
    return this.usuariosService.obtenerUsuariosEliminados();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Put(':id/disable')
  @HttpCode(HttpStatus.OK)
  disable(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.disable(+id);
  }

  @Put(':id/enable')
  @HttpCode(HttpStatus.OK)
  enable(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.enable(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.usuariosService.remove(+id);
  }

  @Get('buscar-usuario/:usuario')
  findByUsername(
    @Param('usuario') usuario: string,
  ): Promise<Usuario | undefined> {
    return this.usuariosService.findByUsername(usuario);
  }

  @Get('buscar-parcial/:usuario')
  findByPartialUsername(@Param('usuario') usuario: string): Promise<Usuario[]> {
    return this.usuariosService.findByPartialUsername(usuario);
  }

  @Get('role/:id_cargo')
  findByRole(@Param('id_cargo') id_cargo: string): Promise<Usuario[]> {
    return this.usuariosService.findByRole(+id_cargo);
  }
}
