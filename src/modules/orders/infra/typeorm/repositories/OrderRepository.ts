import IOrderDTO from "../../../dtos/IOrderDTO";
import IOrderRepository from "../../../repositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async clientOrders(id: number): Promise<Order[]> {
    const pedidos = await this.ormRepository.find({
         where: {
              cliente_id: id,
         },
    });
    return pedidos;
  }

  async findById(id: number): Promise<Order | undefined> {
    /* const pedido = await this.ormReposotory.findOne(id, {
      relations: ["produtos"],
    });

    return pedido; */

    return this.ormRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.pedido_produtos", "pp")
      .leftJoinAndSelect("pp.produto", "p")
      .where("order.id = :id", { id })
      .getOne();
  }

  async create(data: IOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    return this.ormRepository.save(order);
  }
}