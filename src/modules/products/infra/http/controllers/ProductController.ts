import { Request, Response } from "express";
import CreateProductService from "../../../services/CreateProductService";
import FindAllProductsService from "../../../services/FindAllProductsService";
import FindProductByIdService from "../../../services/FindProductByIdService";
import UpdateProductService from "../../../services/UpdateProductService";

class ProductsController {
    async create(request: Request,  response: Response): Promise<Response>{
        const data = request.body; //manda arq json com nome... no body da requisição

        const createProductService = new CreateProductService();

        const product = await createProductService.execute(data);

        return response.json(product);
    }

    async list(request: Request, response: Response): Promise <Response>{
        const listAllProductsService = new FindAllProductsService();

        const products = await listAllProductsService.execute();

        return response.json(products);
    }

    async findById(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;

        const findProductById = new FindProductByIdService();

        const product = await findProductById.execute(Number(id));

        return response.json(product);
    }

    async update(request: Request, response: Response): Promise<Response>{
        const data = request.body;
        const { id } = request.params;

        const updateProductService = new UpdateProductService();

        const data_to_update = {
            ...data,
            id: Number(id),
        }        

        const product = await updateProductService.execute(data_to_update);

        return response.json(product);
    }
}

export default new ProductsController;