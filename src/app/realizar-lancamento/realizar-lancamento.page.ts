import { AlertController} from '@ionic/angular';
import { DataLancamentoService, Dados } from '../services/data-lancamento.service';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  dados: Dados = {
    data: new Date(),
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
    private DataLancamentoService: DataLancamentoService,
    private dataPacienteService: DataPacienteService,  
    private cd: ChangeDetectorRef,
    private router: Router
  ) { 
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    this.data = new Date();
  }

  async calcularDiabetes() {
    if(await this.validarDados()){

      this.dados = { 
        data: this.data,
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

      console.log(this.dados);
      
      this.DataLancamentoService.calcularInterventionGroup(this.dados).subscribe(result =>
        this.showAlert("Seu risco é: " + result)
      );
        
      this.DataLancamentoService.calcularComparativeGroup(this.dados).subscribe(result =>
        this.showAlert("Seu risco comparativo é: " + result)
      );
   }
    this.DataLancamentoService.addLancamento(this.dados);
    this.router.navigateByUrl('/home/resultado', { replaceUrl: true });
  }
  
  validarDados() : boolean{
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