import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato } from './contato';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class CrudContatoService {
  private _PATH : string = 'contatos/';
  private _user : Usuario;

  constructor(private db : AngularFireDatabase, private auth: AuthService) {
    this._user = this.auth.getUsuarioLogado();
    this._PATH = this._PATH+""+this._user.uid;
  }

  public criarContato(contato : Contato) {
    return this.db.database.ref(this._PATH).push(contato);
  }

  public editarContato(chave : string, contato : Contato) {
    return this.db.database.ref(this._PATH).child(chave).update(contato);
  }

  public excluirContato(chave : string) {
    return this.db.database.ref(this._PATH+"/"+chave).remove();
  }

  public getContatos(){
    return this.db.list(this._PATH).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key : c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }

  public getContato(chave : string) {
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(chave)).snapshotChanges().pipe(
      map((action) => {
        return action.map((c) => ({
          key : c.payload.key,
          data: c.payload.val()
        }))
      })
    );
  }
}
