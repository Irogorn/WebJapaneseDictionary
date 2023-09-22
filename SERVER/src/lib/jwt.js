import fastifyJWT from '@fastify/jwt';

export default async function jwt(app) {
    app.register(fastifyJWT, {
        secret: process.env.API_SECRET,
    });
}