import { Commentary, ArrayCommentary, NewCommentary} from "./schemas.js";
import { decryptageData } from "../tools/tools.js"

export default async function commentaryRoutes(app) {

    /*************"/commentaries/:wordId"************
     * Route pour obtenir les commentaires d'un mot.
     * Route to get commentaries associated with a word.
     */
    app.get(
      "/commentaries/:wordId",
      {
        schema: {
        tags: ["Commentary"],
        params: {
          type: "object",
            properties: {
              wordId: {
                type: "string",
                description: "wordId from a commentary",
              },
            },
            required: ["wordId"],
          },
          response: {200: ArrayCommentary},
        },
      }, 
    async (request, reply) => {
      try{Commentary

        return await app.commentary.getW(request.params.wordId);

      }
      catch(errors){

        reply.code(404).send({error: errors.message})

      }

    });

    /*************"/commentary/:userId"************
     * Route pour obtenir les commentaires d'un utilisateur.
     * Route to get commentaries associated with a user.
     */
    app.get(
      "/commentary/:userId",
      {
        schema: {
          tags: ["Commentary"],
          params: {
            type: "object",
              properties: {
                userId: {
                  type: "string",
                  description: "userId from a commentary",
                },
              },
              required: ["userId"],
            },
          security: [{Bearer: []}],
        },
      }, 
    async (request, reply) => {
      try{

        await request.jwtVerify();

        return app.commentary.getU(request.params.userId);

      }
      catch(errors){
        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{
          reply.code(404).send({error: errors.message})
        }

      }
    });

    /*************"/commentary"************
     * Route pour créer un commentaire.
     * Route to create a commentary.
     */
    app.post("/commentary",
    {
      schema:{
        tags: ["Commentary"],
        body: NewCommentary,
        security: [{Bearer: []}]
    }},
    async (request,reply)=>{
      try{

        await request.jwtVerify();

        let decodedToken = app.jwt.decode(request.headers["authorization"].split(" ")[1]);

        request.body = {...request.body,userId: decryptageData(decodedToken.id)};

        return await app.commentary.create(request.body);

      }
      catch(error){

        if (error.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{

          reply.code(404);

        }

      }
    });

    /*************"/commentary/modified"************
     * Route pour modifier un commentaire.
     * Route to alter a commentary.
     */
    app.patch("/commentary/modified",
    {
      schema:{
        tags: ["Commentary"],
        body: Commentary,
        security: [{Bearer: []}]
    }},async (request,reply)=>{
      try{

        await request.jwtVerify();

        return app.commentary.update(request.body);

      }
      catch(error){

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{

          reply.code(404).send({error: errors.message})

        }
      }
    });

    /*************"/commentary/deleteone"************
     * Route pour effecer un commentaire.
     * Route to delete a commentary.
     */
    app.delete("/commentary/deleteone",
    {
      schema:{
        tags: ["Commentary"],
        body: Commentary,
        security: [{Bearer: []}]
    }}
    ,async (request,reply)=>{
      try{
        await request.jwtVerify(); 

        app.commentary.destroyOne(request.body);

      }
      catch(error){

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{

          reply.code(404).send({error: errors.message})

        }
      }
    });

    /*************"/commentary/deletedall"************
     * Route pour anonymiser tous les commentaires d'un user qui supprime sont compte.
     * Route to anonymize all commentaryies of a user who deletes his account.
     */
    app.delete("/commentary/deletedall",
    {
      schema:{
        tags: ["Commentary"],
        body: Commentary,
        security: [{Bearer: []}]
    }},
    async (request,reply)=>{
      try{

        await request.jwtVerify();

        app.commentary.destroyAllForOneWord(request.body);

      }
      catch(error){

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'});

        }
        else{

          reply.code(404).send({error: errors.message});

        }
      }
    });
}