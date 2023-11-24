import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Aluno } from "../interfaces/aluno.interface";
import { Matricula } from "../interfaces/matricula.interface";
import { AlunoService } from "./aluno.service";

@Injectable({
    providedIn: 'root'
})
export class MatriculaService {

    private matriculas: Matricula[] = [];

    constructor(private alunoService: AlunoService) { }

    public efeturarMatricula(matricula: Matricula): Observable<string> {

        if (this.alunoService.isAlunoCadastrado(matricula.aluno.cpf)) {
            return throwError('O Aluno já possui um cadastrado');
        }
        this.matriculas.push(matricula);
        this.alunoService.cadastrarAluno(matricula.aluno);
 
        return of('Matrícula efetuada com sucesso');
    }
}