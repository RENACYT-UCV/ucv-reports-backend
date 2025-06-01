import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { VerifyUserDto } from './dto/verify-user.dto';

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

  async verifyUserByPersonalData(verifyUserDto: VerifyUserDto): Promise<any> {
    const { usuario, nombre, apellido_paterno, apellido_materno } =
      verifyUserDto;
    return this.usersService.findByPersonalData(
      usuario,
      nombre,
      apellido_paterno,
      apellido_materno,
    );
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
}
