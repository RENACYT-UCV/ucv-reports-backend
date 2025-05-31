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
  UseGuards, // Add UseGuards
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { AuthGuard } from '@nestjs/passport'; // Add AuthGuard

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard('jwt')) // Add this line
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
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

  @Get('eliminados')
  async obtenerUsuariosEliminados(): Promise<Usuario[]> {
    return this.usuariosService.obtenerUsuariosEliminados();
  }
}
