import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Aluno } from "../interfaces/aluno.interface";

@Injectable({
    providedIn: 'root'
})
export class AlunoService {

    private alunos: Aluno[] = [];

    constructor() { }

    public cadastrarAluno(aluno: Aluno) {
        this.alunos.push(aluno)
    }

    public editarDadosAluno(aluno: Aluno): Observable<string> {
        let alunoRegistrado = this.alunos.find((alunoRegistrado) => alunoRegistrado.cpf === aluno.cpf);
        alunoRegistrado = aluno;
        return of('Aluno atualizado com sucesso');
    }

    public recuperaDadosAluno(cpf: string): Observable<Aluno | undefined> {
        const aluno = this.alunos.find((alunoRegistrado) => alunoRegistrado.cpf === cpf);
        return of(aluno);
    }

    public recuperarAlunos(): Observable<Aluno[]> {
        return of(this.alunos);
    }

    public isAlunoCadastrado(cpf: string): boolean {
        return this.alunos && this.alunos.find((aluno) => aluno.cpf === cpf) ? true : false;
    }

    public excluirAluno(cpf: string): Observable<string> {
        this.alunos = this.alunos.filter(aluno => aluno.cpf !== cpf);
        return of('Aluno excluido com sucesso');
    }
}