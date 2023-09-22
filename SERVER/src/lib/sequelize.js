import sequelize from 'sequelize';

export default async function Sequelize(app) {
        const orm = new sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{   
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                logging: false});

        app.decorate('sequelize', orm);
}