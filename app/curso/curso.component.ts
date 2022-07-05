//Onde ficam as regras de negócio, eventos de moude, teclado, inicialização, etc
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',   //página html interna
  styleUrls: ['./curso.component.css']   //EStilo interno
})
export class CursoComponent implements OnInit {

  //Vetor
  vetor:Curso[];

  //Objeto da classe Curso
  curso = new Curso();
  
  constructor(private curso_servico:CursoService) { }   //Para executar um funcionalidade ou intanciar um objeto etc

  //inicializador
  ngOnInit(){   //Ao carregar a página, ele pode executar alguma ação, ex: quando carregar toda a estrutura da página,vc poderia listar os cursos
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //Cadastro
  cadastro():void{
    alert("cadastro");
  }

  //Seleção
  selecao(){
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //Alterar
  alterar():void{
    alert("Alterar");
  }

  //Remover
  remover():void{
    alert("Remover");
  }


}
