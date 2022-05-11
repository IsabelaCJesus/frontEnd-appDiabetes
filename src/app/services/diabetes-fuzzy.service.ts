import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Dados {
  idade: number;
  altura: number;
  peso: number;
  triglicerideos: number;
  tempoEvolutivo: number;
  circunferenciaAbdominal: number;
  renda: number;
  escolaridade: number;
}

@Injectable({
  providedIn: 'root'
})

export class DiabetesFuzzyService {
  
  private readonly API = '/api/diabetes';

  constructor(private httpClient: HttpClient) {}

   calcular(dados: Dados) {
    return this.httpClient.post<Dados>(this.API, dados);
   }
}
