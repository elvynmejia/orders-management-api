import { DataSource } from 'typeorm';
import { Products } from './models/product';

export default new DataSource({
    type: "mysql",
    extra: {
        decimalNumbers: true
    },
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "test",
    // entities: ["compiled/app/models/*.js"],
    entities: [Products],
    // entities: ['./models/*.ts'],
    migrations: ["compiled/app/migrations/*.js"],
    logging: true,
    synchronize: false, 
});