export default interface IClientDTO {
    id?: number; //não é obrigatório, por isso o ?, nesse caso o id é auto-increment
    descricao: string;
}