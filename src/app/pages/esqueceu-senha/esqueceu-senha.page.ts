import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.page.html',
  styleUrls: ['./esqueceu-senha.page.scss'],
})
export class EsqueceuSenhaPage implements OnInit {
  private _formRecuperar : FormGroup;
  private _isSubmited : boolean = false;

  constructor(public alertController: AlertController,
    public router : Router, public auth : AuthService, public formBuilder: FormBuilder) {}


  ngOnInit() {
    this._formRecuperar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]]
    });
  }

  get errorControl(){
    return this._formRecuperar.controls;
  }

  public submitForm(){
    this._isSubmited = true;
    if(!this._formRecuperar.valid){
      this.presentAlert('Agenda', 'Erro', 'Campos inválidos.');
      return false;
    }else{
      this.recuperar();
    }
  }

  private recuperar() : void{
    this.auth.recuperarSenha(this._formRecuperar.value['email']);
    this.router.navigate(["/login"]);
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

}
