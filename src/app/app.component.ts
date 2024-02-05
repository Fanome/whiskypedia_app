import { Component, OnInit } from '@angular/core';
import { Usuario } from './model/usuario.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit {
  public loginok: number = 1;
  public usuarios: Usuario = {};

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    { title: 'Login', url: '/pages/login', icon: 'mail' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(){} 
  
  ngOnInit() {
    this.loginok = 1;
  }

  fazerLogin(){
    this.loginok = 2;
  }

  sair(){
    this.loginok = 1;
  }

  criarUsuario(){
    this.loginok = 3;
  }

  criarNovoUsuario(): void {
    console.log(this.usuarios);

    this.usuarios = {};

    //alert("criou");
    this.loginok = 1;
  }
}