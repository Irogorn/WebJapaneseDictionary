import { NewUser, UserUpdate, User, Credential, Token} from "./schemas.js";
import { cryptageData, decryptageData, IsEmail } from "../tools/tools.js"
import {randomBytes} from 'crypto'
import { log } from "console";

export default async function userRoutes(app) {

  /************"/subscribe"******************
   * Route pour la création d'un utilisateur.
   * Route for creation a user.
   *******************************************/
  app.post(
    "/subscribe",
    {
      schema: {
        tags: ["User"],
        body: NewUser,
        response: { 201: User },
      },
    },
    async (request, reply) => {
      try {

        if(IsEmail(request.body.eMail)){

          request.body.passWord = await app.bcrypt.hash(request.body.passWord,10);

          reply.code(201);
  
          return app.users.create(request.body);

        }

        return null;

      } catch (errors) {

        reply.code(404).send({error: errors.message})

      }
    }
  );

  /************"/user/:email"******************
   * Route pour récupérer un user par son email.
   * Route for getting a user by his email.
   *******************************************/
  app.get(
    "/user/:email",
    {
      schema: {
        tags: ["User"],
        params: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "email",
            },
          },
          required: ["email"],
        },
      },
    },
    async (request, reply) => {
      try{

        return app.users.getByEmail(request.params.email);

      }
      catch(errors){

          reply.code(404).send({error: errors.message});

        }
      }
  );

  /************"/user_mails"******************
   * Route pour récupérer les courriels.
   * Route for getting a email list back.
   *******************************************/
    app.get(
    "/user_mails",
    {
      schema: {
        tags: ["Subscribtion"],
      },
    },
    async (request, reply) => {
      try{

        return app.users.getEmails();

      }
      catch(errors){

          reply.code(404).send({error: errors.message});

        }
      }
  );

  /************"/user_mail"******************
   * Route pour récupérer les nom d'utilisateurs.
   * Route for getting a username list back.
   *******************************************/
  app.get(
    "/user_mail",
    {
      schema: {
        tags: ["Subscribtion"],
        security:[{Bearer: []}]
      },
    },
    async (request, reply) => {
        try{

          await request.jwtVerify();

          let decodedToken = app.jwt.decode(request.headers["authorization"].split(" ")[1]);

          let user = await app.users.get(decryptageData(decodedToken.id));
          
          if(user){

            return app.users.getEmails(user.eMail)
          }
          return null;

        }
        catch(errors){

            reply.code(404).send({error: errors.message});

        }
      }
  );

  /************"/user_names"*****************
   * Route pour récupérer les nom d'utilisateurs.
   * Route for getting a username list back.
   ******************************************/
  app.get(
    "/user_names",
    {
      schema: {
        tags: ["Subscribtion"],
      },
    },
    async (request, reply) => {
        try{

          return app.users.getUserNames();

        }
        catch(errors){

            reply.code(404).send({error: errors.message});

        }

      }

  );

  /************ "/user_name"*****************
   * Route pour récupérer les nom d'utilisateurs sauf celui de l'utilisateur.
   * Route for getting a username list back except user's.
   */
  app.get(
    "/user_name",
    {
      schema: {
        tags: ["Subscribtion"],
        security:[{Bearer: []}]
      },
    },
    async (request, reply) => {
        try{

          await request.jwtVerify();

          let decodedToken = app.jwt.decode(request.headers["authorization"].split(" ")[1]);

          let user = await app.users.get(decryptageData(decodedToken.id));

          if(user){

            return app.users.getUserNames(user.userName);

          }
          return null;
        }
        catch(errors){

            reply.code(404).send({error: errors.message});

        }
      }
  );

  /************"/user"******************
   * Route pour récupérer un utilisateur.
   * Route for getting a user back.
   *******************************************/
  app.get(
    "/user",
    {
      schema: {
        tags: ["User"],
        
        security:[{Bearer: []}]
      },
    },
    async (request, reply) => {
      try{
        await request.jwtVerify();

        let decodedToken = app.jwt.decode(request.headers["authorization"].split(" ")[1]);

        return app.users.get(decryptageData(decodedToken.id));

      }
      catch(errors){

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'});

        }
        else{

          reply.code(404).send({error: errors.message});

        }
      }

    }
    
  );

  /************"/update"******************
   * Route pour la mise à jour des données utilisateurs.
   * Route to update an user data.
   ***************************************/
  app.patch(
    "/update",
    {
      schema: {
        tags: ["User"],
        body: UserUpdate,
        response: { 201: User },
        security:[{Bearer: []}]
      },
    },
    async (request, reply) => {
      try {
        await request.jwtVerify();

        let user = await app.users.getByEmail(request.body.eMail);

        user.eMail = request.body.eMail; 
        user.userName = request.body.userName; 


        if(request.body.passWord.length !== 0){

          user.passWord = await app.bcrypt.hash(
            request.body.passWord,
            10
          );

        }

        return await app.users.update(user);
        
      } catch (errors) {

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'});

        }
        else{

          reply.code(404).send({error: errors.message});

        }
      }
    }
  );

  /************"/signin"******************
   * Route pour se connecter.
   * Route to connect.
   ***************************************/
  app.post(
    "/signin",
    {
      schema:{
        tags: ["User"],
        body: Credential,
        response: {
          200: Token,
        },
      }
    },
    async (request, reply) => {

      try{
        
        const user = await app.users.getByEmail(request.body.eMail);
        if(user){
            /**
            * Test si un mot de passe est valide
            */
            const granted = await app.bcrypt.compare(
              request.body.passWord,
              user.passWord
            );

            if (!granted) {

              reply.code(401);

              return {
                  message: "Wrong Password and/or Email",
              };

            }

            await app.users.updateLastLogin(user);

            /**
             * Crypte le contenue ({ id: user.id },{expiresIn: '1d'}) et transforme
             * le tout en JWT
             */
            const token = app.jwt.sign({ id: cryptageData(user.userId.toString())},{expiresIn: '12h'});

            return {token};

        }

        return {token: ""}
        
      }
      catch(error){
        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{
          
          reply.code(404).send({error: errors.message});

        }
      }
    }
  )

  /************"/unsubscribe"******************
   * Route pour supprimer utilisateur
   * Route to delete user
    ***************************************/
  app.delete(
    "/unsubscribe",
    {},
    async (request,reply)=>{
      try{
        await request.jwtVerify();

        let decodedToken = app.jwt.decode(request.headers["authorization"].split(" ")[1]);

        app.users.delete(decrypt(decodedToken.id));

        return app.commentaries.destroyAllForOneWord();

      }
      catch(errors){

        if (errors.statusCode === 401){

          reply.code(401).send({error: 'You are not authorized to enter !!!'})

        }
        else{
          
          reply.code(404).send({error: errors.message});

        }

      }
    }
  )

  /************"/request_alter_password"******************
   * Route pour demander un token de changement du mot de passe.
   * Route to request a password change token 
    ***************************************/
  app.post(
    "/request_alter_password",
    {
      schema: {
        tags: ["User"],
      },
    },
    async (request, reply) => {
      try {
        const user = await app.users.getByEmail(request.body.eMail);
        
        if(user){
          if(user.expirationDateNRPT <= new Date()){
            console.log("le pénitent le passe !");
          }
          else{
            console.log(user.expirationDateNRPT);
            console.log(new Date());
          }
          if(user.expirationDateNRPT === null || user.expirationDateNRPT <= new Date()){
            const token = randomBytes(32).toString("hex");
            let date = new Date()
            date.setHours(date.getHours() + 1);

            await app.users.updateRequestedToken(token,date,user.userId);
  
            await app.mailer.sendMail({
              to: `${request.body.eMail}`,
              subject: "Request a new password.",
              text:
                process.env.LINK_HOST+"/resquet_new_password/"+`${token}`,
            });
            reply.code(201);
            return {response: true, dateValiditee: date.getHours().toString()+":"+date.getMinutes().toString()};
          }
          else{
            return {response: false,dateValiditee: user.expirationDateNRPT.getHours().toString()+":"+user.expirationDateNRPT.getMinutes().toString()};
          }
          
        }
        else{
          return {error: "This account doesn't exist !", error_fr: "Ce compte n'existe pas !", error_jp:"このアカウントはありません！"}
        }


      } catch (error) {

          reply.code(404).send({error: error.message});
          
      }
    }
  );

  
  /************"/resquet_new_password"******************
   * Route pour modifier le mot de passe
   * Route to alter the password
    ***************************************/
  app.get(
    "/resquet_new_password/:token",
    {
      schema: {
        tags: ["User"],
        params: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "token",
            },
          },
          required: ["token"],
        },
      },
    },
    async (request, reply) => {
      try {
          const user = await app.users.getByToken(request.params.token);
          if(user && user.expirationDateNRPT > new Date()){
            return user;
          }
          else{
            return null;
          }
        }
      catch (error) {
          reply.code(404).send({error: error.message});
      }
    }
  );

    /************"/update"******************
   * Route pour la mise à jour du mot de passe d'un utilisateur.
   * Route to update an user password.
   ***************************************/
    app.patch(
      "/updateAlterPassWord",
      {
        schema: {
          tags: ["User"],
        },
      },
      async (request, reply) => {
        try {
  
          let user = await app.users.getByEmail(request.body.eMail);

          user.eMail = request.body.eMail; 
          user.userName = request.body.userName; 

          user.newRequestedPasswordToken = null;
          user.expirationDateNRPT = null;

          if(request.body.passWord.length !== 0){
            user.passWord = await app.bcrypt.hash(
              request.body.passWord,
              10
            );
  
          }

          return await app.users.update(user);
          
        } catch (errors) {

            reply.code(404).send({error: errors.message});

        }
      }
    );

}
