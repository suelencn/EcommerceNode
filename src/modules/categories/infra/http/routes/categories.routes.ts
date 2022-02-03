import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const routes = Router();

routes.post('/', CategoryController.create);

routes.get("/", CategoryController.list);

routes.get("/:id", CategoryController.findById);

routes.put("/:id", CategoryController.update);

export default routes;
