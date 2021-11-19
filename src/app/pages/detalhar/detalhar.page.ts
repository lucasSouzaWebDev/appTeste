import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/contato';
import { CrudContatoService } from 'src/app/crud-contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {

  private _contato : Contato;
  private _formDetalhar : FormGroup;
  private _isSubmited : boolean = false;
  private _editar : boolean = false;

  constructor(public alertController: AlertController,
    public router : Router,
    public contatoService: CrudContatoService, public formBuilder: FormBuilder) {}

    ngOnInit() {
      const nav = this.router.getCurrentNavigation();
      this._contato = nav.extras.state.contato;
      this._formDetalhar = this.formBuilder.group({

        nome : [this._contato.getNome(), [Validators.required, Validators.minLength(8)]],
        telefone : [this._contato.getTelefone(), [Validators.required, Validators.minLength(10)]],
        sexo : [this._contato.getSexo(), [Validators.required]],
        data_nascimento : [this._contato.getDataNascimento(), [Validators.required]],
      });
    }

  private editar() : void
  {
      let dataNascimento = this._formDetalhar.value['data_nascimento'].split('T')[0];
      let contatoEditado = new Contato(
        this._formDetalhar.value['nome'], 
        this._formDetalhar.value['telefone'], 
        this._formDetalhar.value['sexo'], 
        dataNascimento
      );

      this.contatoService.editarContato(this._contato.getId(), contatoEditado)
      .then(() => {
        this.presentAlert('Agenda', 'Sucesso', 'Edição Efetuada!');
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        this.presentAlert('Agenda', 'Erro', 'Contato não encontrado!');
      })
  }

  get errorControl(){
    return this._formDetalhar.controls;
  }

  public submitForm(){
    this._isSubmited = true;
    if(!this._formDetalhar.valid){
      //this.presentAlert('Agenda', 'Erro', 'Campos são obrigatórios.');
      return false;
    }else{
      this.editar();
    }
  }

  public excluir() : void{
    this.presentAlertConfirm("Agenda", "Deseja realmente exlcuir o contato?");
  }

  public excluirContato() : void{
    this.contatoService.excluirContato(this._contato.getId())
    .then(() => {
      this.presentAlert('Agenda', 'Sucesso', 'Exclusão Efetuada!');
      this.router.navigate(["/home"]);
    })
    .catch(() => {
      this.presentAlert('Agenda', 'Erro', 'Contato não encontrado!');
    });
  }

  async presentAlert(titulo : string, subtitulo : string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

  }

  async presentAlertConfirm(titulo : string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.excluirContato();
          }
        }
      ]
    });

    await alert.present();
  }

}
