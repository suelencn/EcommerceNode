import AppError from "../../../shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindOrderByClientService{
    public async execute(id: number): Promise<Order[] | AppError> {
        if (!id) {
             return new AppError(
                  "Necessário ID para encontrar os pedidos dos clientes"
             );
        }

        const repository = new OrderRepository();

        const pedidos = await repository.clientOrders(id);

        return pedidos;
   }
}