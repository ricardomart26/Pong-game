import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";

// TODO: Verificar se host e database estão corretos
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: "pong-database",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "database",
    entities: [User],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data
    synchronize: true 
}