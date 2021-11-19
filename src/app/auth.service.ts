import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { auth } from 'firebase';
import { Usuario } from './usuario';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	usuarioDados: any;

	constructor(public ngFireAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone,
		public toastController: ToastController) {
		this.ngFireAuth.authState.subscribe(user => {
			if (user) {
				this.usuarioDados = user;
				localStorage.setItem('user', JSON.stringify(this.usuarioDados));
				JSON.parse(localStorage.getItem('user'));
				return;
			}

			localStorage.setItem('user', null);
			JSON.parse(localStorage.getItem('user'));
		});
	}

	public login(email: string, senha: string) {
		return this.ngFireAuth.signInWithEmailAndPassword(email, senha);
	}

	public cadastrar(email: string, senha: string) {
		return this.ngFireAuth.createUserWithEmailAndPassword(email, senha);
	}

	public loginComGoogle() {
		this.AuthLogin(new auth.GoogleAuthProvider());
	}

	public AuthLogin(provider) {
		return this.ngFireAuth.signInWithPopup(provider)
			.then((result) => {
				this.presentToast('Logou com Google');
				this.ngZone.run(() => {
					this.router.navigate(['home'])
				})
			})
			.catch((err) => {
				this.presentToast(err);
			});
	}

	public estaLogado() : boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return user !== null;
	}

	public getUsuarioLogado() : Usuario {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(user);
		return (user !== null) ? user : null;
	}

	public recuperarSenha(email : string) {
		return this.ngFireAuth.sendPasswordResetEmail(email)
		.then(() => this.presentToast('Enviado para o email ' + email))
		.catch(err => this.presentToast(err));
	}

	public logout() {
		return this.ngFireAuth.signOut()
		.then(() => {
			this.presentToast('Volte sempre!');
			localStorage.removeItem('user');
			this.router.navigate(['login']);
		});
	}

	async presentToast(message : string) {
		const toast = await this.toastController.create({
		  message: message,
		  duration: 5000
		});
		toast.present();
	  }
}
