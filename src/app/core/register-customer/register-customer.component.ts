import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/shared/interfaces/aluno.interface';
import { Matricula } from 'src/app/shared/interfaces/matricula.interface';
import { AlunoService } from 'src/app/shared/services/aluno.service';
import { MatriculaService } from 'src/app/shared/services/matricula.service';
import { MaskUtils } from 'src/app/shared/utils/mask.utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  private matricula: Matricula;

  public formGroup: FormGroup;
  
  public meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public anos: string[];

  constructor(private formBuilder: FormBuilder, private service: MatriculaService,
    private router: Router, private maskUtils: MaskUtils, private alunoService: AlunoService) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.anos = this.generateYears();
  }

  /**
   * metodo responsavel por inicializar formulario
   */
  private inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: this.formBuilder.group({
        endereco: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
      }),
      formaPagamento: this.formBuilder.group({
        nomeCartao: ['', Validators.required],
        mesExpiracao: ['', Validators.required],
        anoExpiracao: ['', Validators.required],
        numeroCartao: ['', Validators.required],
        codigoSeguranca: ['', Validators.required],
      }),
    });
  }

  /**
   * metodo responsavel por recuperar anos permitido para cartoes de credito
   * 
   * @returns opcoes de anos de validade do cartao
   */
   generateYears(): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear + 11; year++) {
      years.push(year.toString());
    }
    return years;
  }

  /**
   * metodo responsavel por validar se campo foi preenchido corretamente
   * @param campo formControlName
   * @returns boolean
   */
  isCampoInvalido(campo: string): boolean {
    const formControl = this.formGroup.get(campo);
    return formControl !== null && formControl.touched && formControl.invalid;
  }

  /**
   * metodo responsavel por efetuar matricula
   */
  public realizarMatricula() {
    this.matricula = {
      aluno: {
        id: this.geradorIdAleatorio(),
        nome: this.formGroup.value.nome,
        email: this.formGroup.value.email,
        cpf: this.formGroup.value.cpf,
        dataCadastro: new Date(),
        endereco: {
          endereco: this.formGroup.value.endereco.endereco,
          estado: this.formGroup.value.endereco.estado,
          cep: this.formGroup.value.endereco.cep,
          cidade: this.formGroup.value.endereco.cidade,
        },
      },
      dadosPagamento: {
        nomeCartao: this.formGroup.value.formaPagamento.nomeCartao,
        numeroCartao: this.formGroup.value.formaPagamento.numeroCartao,
        mesExpiracao: this.formGroup.value.formaPagamento.mesExpiracao,
        anoExpiracao: this.formGroup.value.formaPagamento.anoExpiracao,
        codigoSeguranca: this.formGroup.value.formaPagamento.codigoSeguranca,
      },
      taxaMatricula: 49
    };

    // faz chamada para persistencia da matricula
    this.service.efeturarMatricula(this.matricula).subscribe({
      next: (resp: string) => this.completeComSucesso(resp),
      error: (erro: any) => this.completeComErro(erro)
    });
  }

  completeComSucesso(resp: string) {
    this.exibirMensagem('Sucesso', resp, 'success')
    this.router.navigate(['/list']);
  }

  completeComErro(erro: any) {
    this.exibirMensagem('Erro', erro, 'error');
  }

  onKeyUpCpf() {
    const cpfControl = this.formGroup.get('cpf');
    if (cpfControl !== null && cpfControl.value) {
      cpfControl.setValue(this.maskUtils.aplicaCpfMask(cpfControl.value));
    }
  }

  onKeyUpNumeroCartao() {
    const pagamentoGroup = this.formGroup.get('formaPagamento');
    if (pagamentoGroup !== null) {
      const numeroCartaoControl = pagamentoGroup.get('numeroCartao');

      if (numeroCartaoControl != null && numeroCartaoControl.value) {
        numeroCartaoControl.setValue(this.maskUtils.aplicaCartaoMask(numeroCartaoControl.value));

      }
    }
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
   * metodo responsavel por gerar um id aleatorio para o aluno que esta sendo cadastrado
   * 
   * @returns id
   */
  private geradorIdAleatorio(): number {
    return Math.floor(Math.random() * 10000) + 1
  }
}