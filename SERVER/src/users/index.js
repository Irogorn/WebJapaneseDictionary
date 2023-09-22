import UserModel from './Model/model.js';
import CommentaryModel from '../commentary/Model/model.js';
import userRoutes from './routes.js';

export default async function users(app) {
    app.decorate('users', new UserModel(app.sequelize));
    app.decorate('commentaries', new CommentaryModel(app.sequelize));
    app.register(userRoutes);
}