import { DeleteResult } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindAllClientsService from "./FindAllClientsService";
import FindClientByIdService from "./FindClientByIdService";

export default class DeleteClientService{
    public async execute(id: number): Promise<DeleteResult>{
        const clientRepository = new ClientRepository();

        const findClientByIdService = new FindClientByIdService();

        await findClientByIdService.execute(id);

        const result = await clientRepository.delete(id);

        return result;
    }
}