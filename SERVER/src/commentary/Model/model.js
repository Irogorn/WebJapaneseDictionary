import BaseModel from "../../lib/base-model.js";
import {dfsFirst} from "../../tools/tools.js";
import sanitizeHtml from 'sanitize-html';

export default class CommentaryModel extends BaseModel {

    /**************************************** 
    *Obtenir les commentaries par wordId.
    *Get commentaries by wordId.
    ***************************************/
    async getW(byword){

        let commentaries = await this.listPointer['commentary'].findAll({where: {wordId: byword}});

        let originalComments = [];

        for(let i = commentaries.length-1; i >= 0; --i){
            if(commentaries[i].reply === 0){
                originalComments.push(commentaries[i])
            }
        }

        let repliesToComments = [];
        for(let i = 0; i < commentaries.length; i++){
            if(commentaries[i].reply > 0){
                repliesToComments.push(commentaries[i])
            }
        }

        if(repliesToComments.length > 0){
            let sortedCommentaries = [];
            for(let i = 0; i < originalComments.length; ++i){
                sortedCommentaries = sortedCommentaries.concat(dfsFirst(originalComments[i],repliesToComments))
            }
    
            return sortedCommentaries;
        }

        return originalComments;
        
    }

    /**************************************** 
    *Obtenir les commentaries par userId.
    *Get commentaries by userId.
    ***************************************/
    async getU(byuser){

        let commentaries = await this.listPointer['commentary'].findAll({where: {userId: byuser}});

        let originalComments = [];

        for(let i = commentaries.length-1; i >= 0; --i){
            if(commentaries[i].reply === 0){
                originalComments.push(commentaries[i])
            }
        }

        let repliesToComments = [];
        for(let i = 0; i < commentaries.length; i++){
            if(commentaries[i].reply > 0){
                repliesToComments.push(commentaries[i])
            }
        }

        if(repliesToComments.length > 0){
            let sortedCommentaries = [];
            for(let i = 0; i < originalComments.length; ++i){
                sortedCommentaries = sortedCommentaries.concat(dfsFirst(originalComments[i],repliesToComments))
            }
    
            return sortedCommentaries;
        }

        return originalComments;
        
    }


    /**************************************** 
    *Créer un commentaire.
    *Create a commentary.
    ***************************************/
    async create(commentary){

        commentary = {...commentary,commentary: sanitizeHtml(commentary.commentary),datePosted: Date.now()}

        let user = await this.listPointer['User'].findOne({where: {userId: commentary.userId}})

        if(user){
            commentary = {...commentary,userName: user.userName}
            return await this.listPointer['commentary'].create(commentary);
        }

        return null

    }

    /**************************************** 
    *Mettre à jour un commentaire.
    *Update a commentary.
    ***************************************/
    async update(commentary){

        const com = await this.listPointer['commentary'].findOne({where: {userId:  commentary.userId, wordId: commentary.wordId}});

        if(com){
            this.listPointer['commentary'].update({commentary: sanitizeHtml(commentary.commentary)},{where: {userId:  commentary.userId, wordId: commentary.wordId}});
        }
        
        return com;

    }

    /**************************************** 
    *Supprimer un commentaire.
    *Delete a commentary.
    ***************************************/
    async destroyOne(commentary){

        const toDelete = await this.listPointer['commentary'].findAll({where: {commentaryId: commentary.commentaryId, wordId: commentary.wordId, userId: commentary.userId}});

        toDelete.destroy();
    }

    /**************************************** 
    *Supprimer tous les commentaires d'un utilisateur.
    *Delete all commentaries from a user.
    ***************************************/
    async destroyAllForOneWord(){

        this.listPointer['commentary'].update({userName: "unknown",user_name_reply: "unknown"},{where: {userId:  null}})

    }
}