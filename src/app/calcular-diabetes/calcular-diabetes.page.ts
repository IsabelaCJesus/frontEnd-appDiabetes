import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { DiabetesFuzzyService, Dados } from '../services/diabetes-fuzzy.service';

@Component({
  selector: 'app-calcular-diabetes',
  templateUrl: './calcular-diabetes.page.html',
  styleUrls: ['./calcular-diabetes.page.scss'],
})
export class CalcularDiabetesPage implements OnInit {
  idade: number;
  altura: number;
  peso: number;
  triglicerideos: number;
  tempoEvolutivo: number;
  circunferenciaAbdominal: number;
  renda: number;
  escolaridade: number;

  resultado: Observable<String>;

  dados: Dados = {
    idade: 0,
    altura:  0,
    peso:  0,
    triglicerideos: 0,
    tempoEvolutivo: 0,
    circunferenciaAbdominal: 0,
    renda: 0,
    escolaridade: 0
  };

  constructor(
    private alertController: AlertController,
    private diabetesFuzzyService: DiabetesFuzzyService
  ) { }

  ngOnInit() {}

  async calcularDiabetes() {
    if(await this.validarDados()){

      this.dados = { 
        idade: this.idade,
        altura: this.altura,
        peso: this.peso,
        triglicerideos: this.triglicerideos,
        tempoEvolutivo: this.tempoEvolutivo,
        circunferenciaAbdominal: this.circunferenciaAbdominal,
        renda: this.renda,
        escolaridade: this.escolaridade
      }

      console.log(this.dados);
      this.diabetesFuzzyService.calcular(this.dados).subscribe(result =>
        this.showAlert("Seu risco é: " + result)
      );

    }
  }
  
  validarDados() : boolean{
    if(this.idade == 0){
      this.showAlert("Preencha o campo Idade!");
      return false;
    }else if (this.altura == 0){
      this.showAlert("Preencha o campo Altura!");
      return false;
    }else if (this.peso  == 0){
      this.showAlert("Preencha o campo Peso!");
      return false;
    }else if (this.triglicerideos  == 0){
      this.showAlert("Preencha o campo Triglicerideos!");
      return false;
    }else if (this.tempoEvolutivo  == 0){
      this.showAlert("Preencha o campo Tempo Evolutivo!");
      return false;
    }else if (this.circunferenciaAbdominal  == 0){
      this.showAlert("Preencha o campo Circunferência Abdominal!");
      return false;
    }else if (this.renda == 0){
      this.showAlert("Preencha o campo Renda!");
      return false;
    }else if (this.escolaridade == 0){
      this.showAlert("Preencha o campo Escolaridade!");
      return false;
    }
    
    return true;
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
