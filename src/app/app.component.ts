import { Component, OnInit } from '@angular/core';
import { Usuario } from '../app/model/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', 'app2.component.scss'],
})
export class AppComponent  implements OnInit {
  public loginok: number = 1;
  public usuarios: Usuario = {};
  public telefoneOK: boolean = true;

  public nomeRequired: number = 0;
  public emailRequired: number = 0;
  public telefoneRequired: number = 0;
  public datanasRequired: number = 0;
  public senhaRequired: number = 0;

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
  constructor(){
  } 
  
  ngOnInit(): void {
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

    this.validarCampos();
    this.validarCelular();

    if(this.nomeRequired == 0 && this.emailRequired == 0 &&  this.telefoneRequired == 0 &&  this.datanasRequired == 0 && this.senhaRequired == 0){
      if(this.telefoneOK == false){
        this.loginok = 3;
      }
      else{
        alert("Usuário cadastrado com sucesso!");
        this.usuarios = {};
        this.loginok = 1;
      }
    }  
  }

  validarCelular(){
    if(this.usuarios.telefone_usuario == "" ){
      this.usuarios.telefone_usuario = undefined
      alert("Favor preencher o Celular.");
      this.telefoneOK = false;
    }else{
      if(this.usuarios.telefone_usuario != undefined && this.usuarios.telefone_usuario.length < 11 ){
        alert("Telefone de ter 11 digitos somando com o DDD.");
        this.telefoneOK = false;
      }else{
        this.telefoneOK = true;
      }
    }
  }

  validarCampos(){
    if(this.usuarios.nome_usuario == undefined){
      this.nomeRequired = 1;
    }else{
      this.nomeRequired = 0;
    }

    if(this.usuarios.email_usuario == undefined){
      this.emailRequired = 1;
    }else{
      this.emailRequired = 0;
    }

    if(this.usuarios.telefone_usuario == undefined){
      this.telefoneRequired = 1;
    }else{
      this.telefoneRequired = 0;
    }

    if(this.usuarios.data_nascimento_usuario == undefined){
      this.datanasRequired = 1;
    }else{
      this.datanasRequired = 0;
    }

    if(this.usuarios.senha_usuario == undefined){
      this.senhaRequired = 1;
    }else{
      this.senhaRequired = 0;
    }
  }

  voltar(){
    this.loginok = 1;
  }








}