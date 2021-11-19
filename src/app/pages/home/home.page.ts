import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CrudContatoService } from 'src/app/crud-contato.service';
import { Usuario } from 'src/app/usuario';
import { Contato } from '../../contato';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private _contatos : Contato[];
  private _user : Usuario;
  private data : any;

  constructor(private router : Router,
    private auth : AuthService,
    private contatoService : CrudContatoService) {
    this._user = this.auth.getUsuarioLogado();
    this.data = this.contatoService.getContatos();
    this.data.forEach(data => {
      
      const lista = data as Array<any>;
      this._contatos = [];
      lista.forEach(c=> {
        let contato = new Contato(c.data._nome, c.data._telefone, c.data._sexo, c.data._data_nascimento);
        contato.setId(c.key);
        this._contatos.push(contato);
      });
    });
  }

  public irParaCadastrar() : void
  {
    this.router.navigate(["/cadastrar"]);
  }

  public irParaDetalhar(contato : Contato) : void
  {
    this.router.navigateByUrl("/detalhar", { state : {contato} });
  }

  public logout(){
    this.auth.logout();
  }

}
