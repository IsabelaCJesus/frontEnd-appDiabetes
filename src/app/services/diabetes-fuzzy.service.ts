import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Dados {
  idade: string;
  altura: string;
  peso: string;
  triglicerideos: string;
  tempoEvolutivo: string;
  circunferenciaAbdominal: string;
  renda: string;
  escolaridade: string;
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
