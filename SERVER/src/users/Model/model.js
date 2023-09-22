import BaseModel from "../../lib/base-model.js";
import { cryptageData } from "../../tools/tools.js";
import sanitizeHtml from 'sanitize-html';

export default class UserModel extends BaseModel {

    /*********************
     * Création d'un utilisateur.
     * Create a user.
     */
    async create(document) {

        document = {...document,userName: sanitizeHtml(document.userName),eMail: sanitizeHtml(document.eMail),createdDate: Date.now(),lastLogin: Date.now()};

        return await this.listPointer['User'].create(document);
    }

    /*******************
     * Obtenir d'un utilisateur par son id.
     * get a user by its id.
     */
    async get(id) {

        return await this.listPointer['User'].findOne({where: {userId: id}});
        
    }

    /*******************
     * Obtenir d'un utilisateur par un token.
     * get a user by a token.
     */
    async getByToken(token) {

        return await this.listPointer['User'].findOne({where: {newRequestedPasswordToken: token}});
        
    }

    /********************
     * Obtenir un utilisateur par son courriel.
     * Get a user by his email.
     */
    async getByEmail(email) {
        
        return this.listPointer['User'].findOne({where: {eMail: email}});

    }

    /********************
     * Obtenir tous les courriels.
     * Get all emails.
     */
    async getEmails() {

        let eMails = await this.listPointer['User'].findAll({attributes: ['eMail']});

        let array = [];

        for(let e of eMails){

            array.push(cryptageData(e.eMail));

        }

        return array;

    }

    /********************
     * Obtenir tous les courriels sauf celui de l'utilisateur.
     * Get all emails except user's.
     */
    async getEmails(email) {

        let eMails = await this.listPointer['User'].findAll({attributes: ['eMail']});

        let array = [];

        for(let e of eMails){

            if(e.eMail !== email) {  

                array.push(cryptageData(e.eMail));

            }
        }

        return array;

    }

    /********************
     * Obtenir tous les nom d'utilisateurs.
     * Get all usernames.
     */
    async getUserNames() {

        let userName = await this.listPointer['User'].findAll({attributes: ['userName']});

        let array = [];

        for(let u of userName){

            array.push(cryptageData(u.userName));

        }
        
        return array;

    }

    /********************
     * Obtenir tous les nom d'utilisateurs sauf celui de l'utilisateur.
     * Get all usernames except user's.
     */
    async getUserNames(username) {

        let userName = await this.listPointer['User'].findAll({attributes: ['userName']});

        let array = [];

        for(let u of userName){

            if(u.userName !== username){

                array.push(cryptageData(u.userName));

            }

        }

        return array;

    }

    /****************
     * Met à jour les informations de l'utilisateur.
     * Updates the user's information.
     */
    async update(document){
        await this.listPointer['User'].update({ userName: sanitizeHtml(document.userName), eMail: sanitizeHtml(document.eMail), passWord: document.passWord, 
                                                newRequestedPasswordToken: document.newRequestedPasswordToken, expirationDateNRPT: document.expirationDateNRPT}
                                                ,{where: {userId:  document.userId}});
        return document;
    }

    /*******************
     * Met à jour la date de connection de l'utilisateur.
     * Updates the user's login date.
     */
    async updateLastLogin(document){

        return  await this.listPointer['User'].update({lastLogin: Date.now()},{where: {userId:  document.userId}});

    }

    /*******************
     * Met à jour du token de demande d'un nouveau de pass de l'utilisateur.
     * Updates the token requesting a new user pass.
     */
    async updateRequestedToken(token,date,id){

        return  await this.listPointer['User'].update({newRequestedPasswordToken: token, expirationDateNRPT: date},{where: {userId:  id}});

    }

    /*******************
     * Suppression d'un utilisateur.
     * Deletion of a user.
     */
    async delete(id){

        return await this.listPointer['User'].destroy({where: {userId: id}});

    }
}
