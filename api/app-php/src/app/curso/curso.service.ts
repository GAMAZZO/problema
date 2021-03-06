import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL base
  url = "http://localhost/api/php/";

  //Vetor
  vetor: Curso[];

  constructor(private http: HttpClient) { }

  //Obter todos os cursos
  obterCursos(): Observable<Curso[]>{                 //o Observable vai permitir listar todos os componentes
    return this.http.get(this.url+'listar').pipe(
      map((res) => {                                  // res é resposta, pode se qualque nome
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }

  //Cadastrar curso
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar',{cursos: c})   //cursos é o nome do json que foi implementado no php 
    .pipe(map((res) => { 
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))    
  }

  //Remover curso
  removerCurso(c:Curso): Observable<Curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    return this.http.delete(this.url+'excluir', {params: params})
    .pipe(map((res) => {
      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso'] !== +c.idCurso;
      });

      return this.vetor = filtro;

    }))
  }

  //Atualizar curso
  atualizarCurso(c:Curso): Observable<Curso[]>{

    //Executa a alteração via URL
    return this.http.put(this.url+'alterar', {cursos: c})

    //Percorre o veeotr para seber qual é o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item) => {
        return +item['idCurso'] === +['idCurso']
      });

      //Altero o valor do vetor local
      if(cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }

      //Retorno
      return this.vetor;

    }))

  }

}



