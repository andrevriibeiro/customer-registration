import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/shared/interfaces/aluno.interface';
import { AlunoService } from 'src/app/shared/services/aluno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  public pesquisa: string = '';
  public alunos: Aluno[] = [];
  private alunoEditado: Aluno;

  public alunoSendoEditado: {[key: number]: boolean } = {};

  public aluno: Aluno = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    dataCadastro: new Date()
  }

  editMode = false;


  constructor(private service: AlunoService, private router: Router) {}

  ngOnInit(): void {
      this.recuperarListaDeAlunos();
  }

  /**
   * metodo responsavel por recuperar lista de alunos salva na base
   * 
   */
  private recuperarListaDeAlunos() {
    this.service.recuperarAlunos().subscribe({
      next: (alunos: Aluno[]) => this.completeComSucesso(alunos),
      error: (erro: any) => this.completeComErro(erro)
    });
  }

  completeComSucesso(alunos: Aluno[]) {
    this.alunos = alunos;
  }

  completeComErro(erro: any) {
    this.exibirMensagem('Erro', 'Erro ao recuperar lista de alunos', 'error');
  }

  /**
   * metodo responsavel por exibir msg informativa de sucesso ou erro para usuario
   * 
   * @param title titulo da msg 
   * @param message mensagem
   * @param type tipo de resposta
   */
  private exibirMensagem(title: string, message: string, type: any) {
    Swal.fire(title, message, type);
  }

  /**
   * metodo responsavel por realizar a exclusao do aluno na base
   * 
   * @param cpf do aluno a ser removido
   */
  public excluirAluno(cpf: string) {
    this.service.excluirAluno(cpf).subscribe({
      next: (msg: string) => this.completeExcluirAlunoComSucesso(msg),
      error: (erro: any) => this.completeExcluirAlunoComErro(erro)
    });
  }

  completeExcluirAlunoComSucesso(msg: string) {
    this.exibirMensagem('Sucesso', msg, 'success');
    this.recuperarListaDeAlunos();
  }

  completeExcluirAlunoComErro(erro: any) {
    this.exibirMensagem('Erro', 'Erro tentar excluir um aluno', 'error');
  }

  /**
   * metodo responsavel por chamar a rota de matricula
   */
  public cadastrar() {
    this.router.navigate(['/register']);
  }

  /**
   * metodo responsavel por editar aluno
   */
  public editar(aluno: Aluno) {
    this.alunoSendoEditado[aluno.id] = true;
    this.alunoEditado = {...aluno};
    this.editMode = true;
  }

  public atualizarAluno(aluno: Aluno) {
    aluno.dataCadastro = this.alunoEditado.dataCadastro;
    this.aluno = aluno;
    this.service.editarDadosAluno(this.aluno).subscribe({
      next: (resp: string) => this.completeAtualizarAlunoComSucesso(resp, aluno.id),
      error: (erro: string) => this.completeAtualizarAlunoComErro(erro)
    });
  }

  completeAtualizarAlunoComSucesso(resp: string, id: number) {
    this.exibirMensagem('Sucesso', resp, 'success');
    this.alunoSendoEditado[id] = false;
    this.recuperarListaDeAlunos();
  }

  completeAtualizarAlunoComErro(erro: any) {
    this.exibirMensagem('Erro', 'Erro ao tentar atualizar dados do aluno', 'error');
  }

}
