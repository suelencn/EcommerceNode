import AppError from "../../../shared/errors/AppError";
import ProductRepository from "../../products/infra/typeorm/repositories/ProductRepository";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();

    var total;

    const productRepository = new ProductRepository();

    if(!data.pedido_produtos){
      throw new AppError("O pedido deve ter ao menos um produto!");
    }
    //Verifica detalhes sobre o pedido e produto
    for(let i=0; i< data.pedido_produtos.length; i++){
      const product = await productRepository.findById(data.pedido_produtos[i].produto_id);
      if(product){
        if(data.pedido_produtos[i].quantidade <=0 ){
          throw new AppError("Quantidade inválida!");
        }
        if(product.quantidade > data.pedido_produtos[i].quantidade){
          total =+ (data.pedido_produtos[i].quantidade * product?.preco);
        }
      } else {
        throw new AppError("O produto informado não está cadastrado!");
      }     
    }

    data.valor = total;

    const order = await orderRepository.create(data);

    return order;
  }
}
