import AppError from "../../../shared/errors/AppError";
import IProductDTO from "../dtos/IProductDTO";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductRepository";
import FindProductByIdService from "./FindProductByIdService";

export default class UpdateProductService{
    public async execute(data: IProductDTO): Promise <Product>{
        const productRepository = new ProductRepository();

        const findProductById = new FindProductByIdService();

        if(!data.id){
            throw new AppError("Atualização precisa do id do produto");
        }

        await findProductById.execute(data.id);

        const product = await productRepository.update(data);

        return product;
    }
}