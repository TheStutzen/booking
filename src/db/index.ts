import 'dotenv/config'
import { DataSource } from 'typeorm'

export const mariaDbDataSource = new DataSource({
  type: (process.env.TYPE as any) ?? 'mysql',
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT, 10) ?? 3306,
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  entities: ['src/models/**/entity/*.entity.{ts,js}'],
  logging: false,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['./src/db/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci'
  }
})
