import { Request, Response } from "express";
import CreateCategoryService from "../../../services/CreateCategoryService";
import FindAllCategoriesService from "../../../services/FindAllCategoriesService";
import FindCategoryByIdService from "../../../services/FindCategoryByIdService";
import UpdateCategoryService from "../../../services/UpdateCategoryService";

class CategoriesController {
    async create(request: Request,  response: Response): Promise<Response>{
        const data = request.body; //manda arq json com nome, cpf... no body da requisição

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute(data);

        return response.json(category);
    }

    async list(request: Request, response: Response): Promise <Response>{
        const listAllCategoriesService = new FindAllCategoriesService();

        const categories = await listAllCategoriesService.execute();

        return response.json(categories);
    }

    async findById(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;

        const findCategoyById = new FindCategoryByIdService();

        const category = await findCategoyById.execute(Number(id));

        return response.json(category);
    }

    async update(request: Request, response: Response): Promise<Response>{
        const data = request.body;
        const { id } = request.params;

        const updateCategoryService = new UpdateCategoryService();

        const data_to_update = {
            ...data,
            id: Number(id),
        }        

        const category = await updateCategoryService.execute(data_to_update);

        return response.json(category);
    }
}

export default new CategoriesController;