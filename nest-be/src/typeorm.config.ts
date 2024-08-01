import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'admin123',
  username: 'postgres',
  entities: [User],
  database: 'pgnestdb',
  synchronize: true,
  logging: true,
};
