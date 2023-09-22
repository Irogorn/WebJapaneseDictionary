import fastifyGuard from "fastify-guard";

export default async function guard(app) {
  app.register(fastifyGuard, {
    errorHandler: (result, req, reply) => {
      return reply.send("you are not allowed to call this route");
    },
  });
}
