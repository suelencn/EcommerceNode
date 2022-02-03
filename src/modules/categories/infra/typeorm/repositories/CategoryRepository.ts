import Category from "../entities/Category";
import ICategoryRepository from "../../../repositories/ICategoryRepository";
import ICategoryDTO from "../../../dtos/ICategoryDTO";
import { getRepository, Repository } from "typeorm";

export default class CategoryRepository implements ICategoryRepository {
    private ormRepository: Repository <Category>;

    constructor() {
        this.ormRepository = getRepository(Category);
    }

    async create(data: ICategoryDTO): Promise<Category> {
        const category = this.ormRepository.create(data);
        return this.ormRepository.save(category);
    } 

    async list(): Promise<Category[]>{
        const categories = await this.ormRepository.find();
        return categories;
    }

    async findById(id: number): Promise <Category | undefined>{
        const category = await this.ormRepository.findOne(id);
        return category;
    }

    async update(data: ICategoryDTO): Promise<Category> {
        const category = await this.ormRepository.save(data);
        return category;
    }
}