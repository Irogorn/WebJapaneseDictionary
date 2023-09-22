import LookUpModel from "./Model/model.js";
import lookUpRoutes from "./routes.js";

export default async function lookup(app) {
  app.decorate("lookup", new LookUpModel(app.sequelize));
  app.register(lookUpRoutes);
}
