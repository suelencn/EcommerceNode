import { DeleteResult } from "typeorm";
import Order from "../../orders/infra/typeorm/entities/Order";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";

export default interface IClientRepository{
    create(data: IClientDTO): Promise<Client>;
    list(): Promise<Client[]>
    findById(id: number): Promise<Client | undefined>; //pode ser cliente ou indefinido
    update(data: IClientDTO): Promise<Client>;  //pessoa manda os dados
    delete(id: number): Promise<DeleteResult>;
}