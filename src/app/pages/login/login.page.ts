import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private _formLogar: FormGroup;
  private _isSubmited: boolean = false;

  constructor(public alertController: AlertController,
    public router: Router, public auth: AuthService, public formBuilder: FormBuilder) { }


  ngOnInit() {
    this._formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get errorControl() {
    return this._formLogar.controls;
  }

  public submitForm() {
    this._isSubmited = true;
    if (!this._formLogar.valid) {
      this.presentAlert('Agenda', 'Erro', 'Campos são obrigatórios.');
      return false;
    } else {
      this.logar();
    }
  }

  private logar(): void {
    this.auth.login(this._formLogar.value['email'], this._formLogar.value['senha'])
      .then((res) => {
        this.presentAlert('Agenda', 'Sucesso', 'Seja bem vindo.');
        this.router.navigate(["/home"]);
      }).catch((error) => {
        this.presentAlert('Agenda', 'Erro', 'Erro ao cadastrar: ' + error.message);
      });

  }

  private logarComGmail(): void {
    this.auth.loginComGoogle();
  }

  private irParaCadastrar(): void {
    this.router.navigate(["/criar-usuario"]);
  }

  private irParaRecuperar(): void {
    this.router.navigate(["/esqueceu-senha"]);
  }

  async presentAlert(titulo: string, subtitulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

  }

}
