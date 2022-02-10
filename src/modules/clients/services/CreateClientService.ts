import AppError from "../../../shared/errors/AppError";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindAllClientsService from "./FindAllClientsService";

export default class CreateClientService {
    public async execute(data: IClientDTO): Promise <Client>{

        const clientRepository = new ClientRepository();

        const listclientsService = new FindAllClientsService();

        const clients = await listclientsService.execute();


        for(let i=0; i< clients.length ; i++){
            if(data.cpf === clients[i].cpf){
                throw new AppError("Já existe um cliente com esse CPF");    
            }
        }

        const client = await clientRepository.create(data);

        return client;
    }
}