import { Module } from '@nestjs/common';
import { envConfig } from '@config/env.config';
import { typeOrmModule } from '@config/database.config';

@Module({
  imports: [envConfig(), typeOrmModule()],
})
export class AppModule {}
