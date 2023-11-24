import { Aluno } from "./aluno.interface";
import { DadosPagamento } from "./dados-pagamento.interface";

export interface Matricula {
    aluno: Aluno;
    dadosPagamento: DadosPagamento
    taxaMatricula: number;
}