import { listKanjis, listSearch } from "./schemas.js";

/**
 * Plugin contenant les routes pour les utilisateurs
 */
export default async function lookUpRoutes(app) {
  /**
   * Route pour trouver des définitions.
   * Route to look up definitions..
   */
  app.get(
    "/search/:word",
    {
      schema: {
        tags: ["LookUp"],
        params: {
          type: "object",
          properties: {
            word: {
              type: "string",
              description: "lookedup word",
            },
          },
          required: ["word"],
        },
      },
    },
    async (request, reply) => {
      try {

        return app.lookup.get(request.params.word,app.Datum,app.typeOfWords);  

      } catch (error) {

        reply.code(404).send({error: errors.message});

      }
    }
  );
}
