import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, MenuController} from '@ionic/angular';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ModalPacientePage } from '../modal-paciente/modal-paciente.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: Paciente[] = [];

  constructor(
    private dataPacienteService: DataPacienteService,  
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
    ) {
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

  async addPaciente() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastrar paciente',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
          type: 'text',
        },
        {
          name: 'dataNascimento',
          placeholder: 'Data de Nascimento',
          type: 'text'
        },
        {
          name: 'telefone',
          placeholder: 'Telefone',
          type: 'text'
        },
        {
          name: 'endereco',
          placeholder: 'Endereço',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salvar',
          handler: res => {
            this.dataPacienteService.addPaciente({ nome: res.nome, dataNascimento: res.dataNascimento, 
            telefone: res.telefone, endereco: res.endereco });
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  async openPaciente(paciente: Paciente) {
    const modal = await this.modalCtrl.create({
      component: ModalPacientePage,
      componentProps: { id: paciente.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}



