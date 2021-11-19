import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CrudContatoService } from 'src/app/crud-contato.service';
import { Contato } from '../../contato';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  
  private _formCadastrar : FormGroup;
  private _isSubmited : boolean = false;

  constructor(public alertController: AlertController,
    public router : Router,
    public contatoService: CrudContatoService, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this._formCadastrar = this.formBuilder.group({
      nome : ['', [Validators.required, Validators.minLength(8)]],
      telefone : ['', [Validators.required, Validators.minLength(10)]],
      sexo : ['', [Validators.required]],
      data_nascimento : ['', [Validators.required]],
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
      let dataNascimento = this._formCadastrar.value['data_nascimento'].split('T')[0];
      let contato = new Contato(
        this._formCadastrar.value['nome'], 
        this._formCadastrar.value['telefone'], 
        this._formCadastrar.value['sexo'], 
        dataNascimento
      );
      this.contatoService.criarContato(contato)
      .then(() => {
        this.presentAlert('Agenda', 'Sucesso', 'Cadastro Efetuado!');
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.presentAlert('Agenda', 'Erro', 'Erro ao cadastrar!');
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
