import { Request, Response } from "express";
import FindOrderByIdService from "../../../services/FindOrderByIdService";
import CreateOrderService from "../../../services/CreateOrderService";
import FindOrderByClientService from "../../../services/FindOrderByClientService";

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createOrderService = new CreateOrderService();

    const product = await createOrderService.execute(data);

    return response.json(product);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrderService = new FindOrderByIdService();

    const product = await findOrderService.execute(Number(id));

    return response.json(product);
  }

  async findClientOrder(request: Request, response: Response) {
    const id = Number(request.params.id);

    const clientOrderService = new FindOrderByClientService();

    const pedidos = await clientOrderService.execute(id);

    return response.json(pedidos);
}
}

export default new OrderController();