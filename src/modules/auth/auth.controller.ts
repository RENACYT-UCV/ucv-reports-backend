import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.usuario,
      loginUserDto.contraseña,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('verificar-datos-recuperacion')
  async verificarDatosRecuperacion(@Body() body) {
    // body: { usuario, nombre, apellido_paterno, apellido_materno }
    const result = await this.authService.verificarDatosRecuperacion(body);
    if (result.success) {
      return { success: true, userId: result.userId };
    } else {
      return { success: false };
    }
  }
}
