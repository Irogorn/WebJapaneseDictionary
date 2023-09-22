import fBcrypt from "fastify-bcrypt";
export default async function bcrypt(app) {
    app.register(fBcrypt);
}