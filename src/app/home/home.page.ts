import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  consulta: any;
  cep: string = '';
  cidade: string = '';
  rua: string = '';
  estado: string = '';
  readonly apiurl: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}
  strip() {
    if (this.cep.match(/-/g)) {
      return this.cep.replace(/-/g, '');
    }
    return this.cep.replace(/\s/g, '');

  }
  async consultar() {
    await this.http.get(`${this.apiurl}/${this.strip()}/json`).subscribe((res) => {
       this.consulta = res
    });
  }
  CidadeString(){
    return this.cidade.replace(/\s/g, '%20')
  }
  RuaString(){
    return this.rua.replace(/\s/g, '+')
  }
  async consultarCep(){
    await this.http.get(`${this.apiurl}/${this.estado}/${this.CidadeString()}/${this.RuaString()}/json/`).subscribe((res) => {
      this.consulta = res
    })
  }
} 
