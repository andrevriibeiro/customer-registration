import { Endereco } from "./endereco.interface";

export interface Aluno {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    endereco?: Endereco;
    dataCadastro: Date;
}