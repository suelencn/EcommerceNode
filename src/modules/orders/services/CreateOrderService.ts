import AppError from "../../../shared/errors/AppError";
import ProductRepository from "../../products/infra/typeorm/repositories/ProductRepository";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();

    const order = await orderRepository.create(data);

    const productRepository = new ProductRepository();

    if(!data.pedido_produtos){
      throw new AppError("O pedido deve ter ao menos um produto!");
    }
    //Verifica detalhes sobre o pedido e produto
    for(let i=0; i< data.pedido_produtos.length; i++){
      if(data.pedido_produtos[i].quantidade && data.pedido_produtos[i].produto_id ){
        const product = await productRepository.findById(data.pedido_produtos[i].produto_id);

        if(product){
          //Calcula o valor total do pedido
          if(product.quantidade > data.pedido_produtos[i].quantidade){
            var total =+ (data.pedido_produtos[i].quantidade * product?.preco);
            order.valor = total;
          }
        }
        if(!product){
          throw new AppError("O produto não está cadastrado!");
        }

      } else {
        throw new AppError("Informe quantidade E Id do produto!");
      }     
    }
    return order;
  }
}
