import Fastify from 'fastify';
import fp from 'fastify-plugin';
import {config} from 'dotenv'
import swagger from './lib/swagger.js';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import cors from './lib/cors.js';
import Sequelize from './lib/sequelize.js';
import mailer from './lib/sender.js';
import jwt from './lib/jwt.js'
import guard from './lib/guard.js';
import bcrypt from './lib/bcrypt.js';
import users from './users/index.js'
import lookup from './search/index.js'
import commentary from './commentary/index.js';
import loadData from './lib/loadingData.js';

async function main() {
    config();

    const app = Fastify({
        /*Permet le debugage*/
        logger: process.env.NODE_ENV !== 'production',
        maxParamLength: 1000000,
    });

    app.register(fp(cors));
    app.register(fp(helmet));
    app.register(fp(sensible));
    app.register(fp(swagger));
    app.register(fp(Sequelize));
  //  app.register(fp(guard));
    app.register(fp(bcrypt));
    app.register(fp(mailer));
    app.register(fp(jwt));

    app.register(fp(users));
    app.register(fp(lookup));
    app.register(fp(commentary));

    app.register(fp(async (app)=>{
        await loadData(app)
    }));

    app.ready( err => {
        if(err) throw err;

        app.listen({port : process.env.PORT, host :process.env.HOST}, (err,address) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(
                `le serveur est disponible à l'addresse : ${address}`,
            );
        });
    });
}

main();