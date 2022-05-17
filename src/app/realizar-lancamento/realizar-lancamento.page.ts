import { AlertController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { DiabetesFuzzyService, Dados } from '../services/diabetes-fuzzy.service';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realizar-lancamento',
  templateUrl: './realizar-lancamento.page.html',
  styleUrls: ['./realizar-lancamento.page.scss'],
})
export class RealizarLancamentoPage implements OnInit {
  idPaciente: string;
  coren: string;
  data: Date;
  idade: number;
  altura: number;
  peso: number;
  triglicerideos: number;
  tempoEvolutivo: number;
  circunferenciaAbdominal: number;
  renda: number;
  escolaridade: number;
  paciente: string = "";

  resultado: Observable<String>;

  dados: Dados = {
    idPaciente: "",
    coren: "",
    idade: 0,
    altura:  0,
    peso:  0,
    triglicerideos: 0,
    tempoEvolutivo: 0,
    circunferenciaAbdominal: 0,
    renda: 0,
    escolaridade: 0
  };

  pacientes: Paciente[] = [];

  constructor(
    private alertController: AlertController,
    private diabetesFuzzyService: DiabetesFuzzyService,
    private dataPacienteService: DataPacienteService,  
    private cd: ChangeDetectorRef
  ) { 
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    var data= new Date();
    this.data = data;
  }

  async calcularDiabetes() {
    if(await this.validarDados()){

      this.dados = { 
        idPaciente : this.paciente,
        coren: this.coren,
        idade: this.idade,
        altura: this.altura,
        peso: this.peso,
        triglicerideos: this.triglicerideos,
        tempoEvolutivo: this.tempoEvolutivo,
        circunferenciaAbdominal: this.circunferenciaAbdominal,
        renda: this.renda,
        escolaridade: this.escolaridade
      }

      
      this.diabetesFuzzyService.calcular(this.dados).subscribe(result =>
        this.showAlert("Seu risco é: " + result)
      );

    }
  }
  
  validarDados() : boolean{
    //console.log(this.paciente);
    if(this.paciente == ""){
      this.showAlert("Preencha o campo Paciente!");
      return false;
    }else if (this.coren == ""){
      this.showAlert("Preencha o campo Coren!");
      return false;
    }else if(this.idade == 0){
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