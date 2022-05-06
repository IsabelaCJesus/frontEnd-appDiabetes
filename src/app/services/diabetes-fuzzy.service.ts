import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Resultado {
  resultado: string;
}

@Injectable({
  providedIn: 'root'
})

export class DiabetesFuzzyService {
  
  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient) {}

   list() {
    return this.httpClient.get<Resultado>(this.API);
   }
}
