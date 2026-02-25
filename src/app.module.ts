import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/database.config';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ReturnsModule } from './returns/returns.module';
import { FormsModule } from './forms/forms.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
    }),
    TenantsModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    SalesModule,
    ReturnsModule,
    FormsModule,
    AuthModule,
  ],
})
export class AppModule { }
