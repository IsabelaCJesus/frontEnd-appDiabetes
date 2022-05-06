import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { DiabetesFuzzyService, Resultado } from '../services/diabetes-fuzzy.service';

@Component({
  selector: 'app-calcular-diabetes',
  templateUrl: './calcular-diabetes.page.html',
  styleUrls: ['./calcular-diabetes.page.scss'],
})
export class CalcularDiabetesPage implements OnInit {
  idade: string = "";
  altura: string = "";
  peso: string = "";
  triglicerideos: string = "";
  tempoEvolutivo: string = "";
  circunferenciaAbdominal: string = "";
  renda: string = "";
  escolaridade: string = "";

  resultado: Observable<Resultado>;

  constructor(
    private alertController: AlertController,
    private diabetesFuzzyService: DiabetesFuzzyService
  ) { }

  ngOnInit() {}

  async calcularDiabetes(){
   // if(await this.validarDados()){
      this.resultado = this.diabetesFuzzyService.list();
   // }
    this.showAlert("Seu risco é: " + (await this.resultado.toPromise()).resultado);
  }
  
  validarDados() : boolean{
    if(this.idade == ""){
      this.showAlert("Preencha o campo Idade!");
      return false;
    }else if (this.altura == ""){
      this.showAlert("Preencha o campo Altura!");
      return false;
    }else if (this.peso == ""){
      this.showAlert("Preencha o campo Peso!");
      return false;
    }else if (this.triglicerideos == ""){
      this.showAlert("Preencha o campo Triglicerideos!");
      return false;
    }else if (this.tempoEvolutivo == ""){
      this.showAlert("Preencha o campo Tempo Evolutivo!");
      return false;
    }else if (this.circunferenciaAbdominal == ""){
      this.showAlert("Preencha o campo Circunferência Abdominal!");
      return false;
    }else if (this.renda == ""){
      this.showAlert("Preencha o campo Tempo Evolutivo!");
      return false;
    }else if (this.escolaridade == ""){
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
