import {Router} from "express";

import clientsRoutes from "../../../../modules/clients/infra/http/routes/clients.routes";
import categoriesRoutes from "../../../../modules/categories/infra/http/routes/categories.routes"
import productsRoutes from "../../../../modules/products/infra/http/routes/products.routes";
import ordersRoutes from "../../../../modules/orders/infra/http/routes/orders.routes";

const routes = Router();

routes.use("/clientes", clientsRoutes);
routes.use("/categorias", categoriesRoutes);
routes.use("/produtos", productsRoutes);
routes.use("/orders", ordersRoutes);

export default routes;