//Onde ficam as regras de negócio, eventos de moude, teclado, inicialização, etc
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',   //página html interna
  styleUrls: ['./curso.component.css']   //Estilo interno
})
export class CursoComponent implements OnInit {


  //Vetor
  vetor: Curso[];

  //Objeto da classe Curso
  curso = new Curso();
  

  constructor(private curso_servico:CursoService) { }   //Para executar um funcionalidade ou instanciar um objeto etc. curso_servico vai ter as funcionalidade para trabalhar com o banco de dados

  //inicializador
  ngOnInit(){                                           //Ao carregar a página, ele pode executar alguma ação, ex: quando carregar toda a estrutura da página,vc poderia listar os cursos
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }


  
  //Seleção
  selecao(){                                           //vincular os objetos para se ter os dados
    this.curso_servico.obterCursos().subscribe(        //Subscribe vai pegar todos os dados do método serviço, e vai fazer ter acesso a elas
    (res: Curso[]) => {
      this.vetor = res;                              //Agora o vetor vai ter todos os dados de selecao do curso.service.ts
    }
    )
  }
  
  //Cadastro
  cadastro(){
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualizar a listagem 
        this.selecao();

      }
    )
  }

  
  //Alterar
  alterar(){
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {

        //Atualizar vetor
        this.vetor = res;

        //Limpar os valores do objeto
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualiza a listagem
        this.selecao();
      }
    )
  }

  //Remover
  remover(){
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;
      }
    )
  }

  //Selecionar curso específico
  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}
