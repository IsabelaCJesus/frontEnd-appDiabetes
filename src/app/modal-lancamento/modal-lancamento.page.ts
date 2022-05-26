import { Dados, DataLancamentoService } from '../services/data-lancamento.service';
import { Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-lancamento',
  templateUrl: './modal-lancamento.page.html',
  styleUrls: ['./modal-lancamento.page.scss'],
})
export class ModalLancamentoPage implements OnInit {
  @Input() id: string;

  lancamento: Dados = {
    data: new Date(),
    idPaciente: "",
    coren: "",
    idade: 0,
    altura: 0,
    peso: 0,
    triglicerideos: 0,
    tempoEvolutivo: 0,
    circunferenciaAbdominal: 0,
    renda: 0,
    escolaridade: 0,
    resultadoIntervencao: 0,
    resultadoComparativo: 0
  };
 
  constructor(
    private dataLancamentoService: DataLancamentoService, 
    private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private cd: ChangeDetectorRef,
  ) 
  {
  }
 
  ngOnInit() {
  }

  async preencheCampos(){
    this.dataLancamentoService.getLancamentoById(this.id).subscribe(res => {
      this.lancamento = res;
    }); 
  }

  /*getEmpresaPessoa(id){
    this.dataServiceEmpresa.getEmpresaById(id).subscribe(res => {
      this.empresaPessoa = res;
    });
  }*/

  async updatePessoa() {
    await this.dataLancamentoService.updateLancamento(this.lancamento);
    const toast = await this.toastCtrl.create({
      message: 'Dados atualizados com sucesso!',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  async cancelar(){
    this.modalCtrl.dismiss();
  }
}