import IClientDTO from "../../../dtos/IClientDTO";
import IClientRepository from "../../../repositories/IClientRepository";
import { DeleteResult, getRepository, Repository } from "typeorm";
import Client from "../entities/Client";
import Order from "../../../../orders/infra/typeorm/entities/Order";

export default class ClientRepository implements IClientRepository {
    private ormRepository: Repository <Client>;

    constructor() {
        this.ormRepository = getRepository(Client);
    }
    async delete(id: number): Promise<DeleteResult> {
        return this.ormRepository.delete(id);
    }
    async update(data: IClientDTO): Promise<Client> {
        const client = await this.ormRepository.save(data);
        return client;
    }
    async list(): Promise<Client[]> {
        const clients = await this.ormRepository.find();
        return clients;
    }

    async findById(id: number): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne(id);
        return client;
    }

    async create(data: IClientDTO): Promise<Client> {
        const client = this.ormRepository.create(data);
        return this.ormRepository.save(client);
    }
    
}