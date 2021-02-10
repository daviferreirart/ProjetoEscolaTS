import mysql, { Connection } from "mysql2/promise";

abstract class Database {
    static connection: Connection
    static async connect() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'DAVI890',
            database: 'escola'
        })
        console.log("Conectado ao banco!")
    }
}
export default Database;