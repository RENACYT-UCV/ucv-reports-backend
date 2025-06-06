import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUsuarioDto } from '../usuarios/dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(usuario);
    if (user && (await bcrypt.compare(pass, user.contraseña))) {
      const { contraseña, ...result } = user;
      // Assuming user.cargo.descripcion holds the role information
      return { ...result, role: user.cargo?.descripcion };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.usuario,
      sub: user.IDUsuario,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role, // Include role in the response
    };
  }

  async verificarDatosRecuperacion({
    usuario,
    nombre,
    apellido_paterno,
    apellido_materno,
  }) {
    // Buscar usuario que coincida exactamente con todos los campos
    const users = await this.usersService.getUsuarioRepository().find({
      where: {
        usuario,
        nombre,
        apellido_paterno,
        apellido_materno,
      },
    });
    if (users.length === 1) {
      return { success: true, userId: users[0].IDUsuario };
    } else {
      return { success: false };
    }
  }

  async changePassword(userId: number, newPassword: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    const updateDto: UpdateUsuarioDto = {
      contraseña: newPassword,
    };
    await this.usersService.update(userId, updateDto);
    return { success: true };
  }
}
