import CommentaryModel from "./Model/model.js";
import commentaryRoutes from "./routes.js";

export default async function commentary(app) {
    app.decorate("commentary", new CommentaryModel(app.sequelize));
    app.register(commentaryRoutes);
}
