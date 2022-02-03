import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoryRepository{
    create(data: ICategoryDTO): Promise<Category>;
    list(): Promise<Category[]>
    findById(id: number) : Promise <Category | undefined>;
    update(data: ICategoryDTO) : Promise <Category>;
}