import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    logging: true,
    entities: [__dirname + '/common/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    subscribers: [],
});
