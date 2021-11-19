import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.page.html',
  styleUrls: ['./criar-usuario.page.scss'],
})
export class CriarUsuarioPage implements OnInit {
  private _formCadastrar : FormGroup;
  private _isSubmited : boolean = false;

  constructor(public alertController: AlertController,
    public router : Router, public auth : AuthService, public formBuilder: FormBuilder) {}


  ngOnInit() {
    this._formCadastrar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha : ['', [Validators.required, Validators.minLength(6)]],
      confSenha : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this._formCadastrar.controls;
  }

  public submitForm(){
    this._isSubmited = true;
    if(!this._formCadastrar.valid){
      this.presentAlert('Agenda', 'Erro', 'Campos são obrigatórios.');
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar() : void{
    this.auth.cadastrar(this._formCadastrar.value['email'], this._formCadastrar.value['senha'])
    .then((res) => {
      this.presentAlert('Agenda', 'Sucesso', 'Cadastro efetuado.');
      this.router.navigate(["/login"]);
    }).catch((error) => {
      this.presentAlert('Agenda', 'Erro', 'Erro ao cadastrar: ' + error.message);
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

}
