import cor from '@fastify/cors';
export default async function cors(app) {
    app.register(cor, { origin: 'http://127.0.0.1:3030' });
}