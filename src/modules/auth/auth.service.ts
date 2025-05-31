import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
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
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.usuario, sub: user.IDUsuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
