import { Component, OnInit } from '@angular/core';
import { Usuario } from '../app/model/usuario.model';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Router } from '@angular/router'; 
import { Login } from '../../src/app/model/login.model';
import { TesteDataBase } from './service_db/teste_db/teste_db.service';
import { UsuarioDataBase } from './service_db/usuario_db/usuario_db.service';
import { ConfigService } from './service/config/config-service';
import { InicioDataBase } from './service_db/inicio_db/inicio_db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', 'app2.component.scss', 'app-login.component.scss'],
})
export class AppComponent  implements OnInit {
  public loginok: number = 1;
  public usuarios: Usuario = {};
  public usuarioLogado: Usuario[] = [] ;
  public login: Login = {};
  public telefoneOK: boolean = true;
  public emailOK: boolean = true;
  public senhaOK: boolean = true;

  public nomeRequired: number = 0;
  public emailRequired: number = 0;
  public telefoneRequired: number = 0;
  public datanasRequired: number = 0;
  public senhaRequired: number = 0;

  public nomeUsuario: any;
  public tipoUsuario: any;

  loaderLogin = false;

  emailControl = new FormControl('', Validators.email);

  public appPages = [
    { title: 'Home', url: '/home', icon: '' },
    { title: 'Whiskys', url: '/clientewhisky', icon: '' },
    { title: 'Minha Adega', url: '/minhaadega', icon: '' },
    { title: 'Meus Favoritos', url: '/meusfavoritos', icon: '' },
    { title: 'Meu Perfil', url: '/meuperfil', icon: '' },
    // { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public appPagesAdmin = [
    { title: 'Fabricante', url: '/fabricante', icon: '' },
    { title: 'Tipo Whisky', url: '/tipowhisky', icon: '' },
    { title: 'Whisky', url: '/whisky', icon: '' },
    { title: 'Migracao', url: '/migracao', icon: '' },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router, 
    private testeDataBase: TesteDataBase,
    private usuarioDataBase: UsuarioDataBase,
    private configService: ConfigService,
    private inicioDataBase: InicioDataBase
    ){

      if(this.configService.bancoDados() == "sqllite"){
        try{
          this.carregartabelas();
        }
        catch (error) {
          console.error('Erro ao configurar banco:', error);
          throw error;
        }
      }
  } 
  
  ngOnInit(): void {
    this.login.email_usuario = '';
    this.login.senha_usuario = ''
    this.nomeUsuario = '';
    this.tipoUsuario = 0;
  }

  async carregartabelas(): Promise<void>{
    await this.inicioDataBase.createOpenDatabase();
  }

  async fazerLogin():  Promise<void>{
    if(this.login.email_usuario == ''){
      this.notificacao("danger", "Digite o e-mail de usuário.");
    }
    if(this.login.senha_usuario == ''){
      this.notificacao("danger", "Digite a senha de usuário.");
    }

    const email = this.login.email_usuario == undefined ? "" : this.login.email_usuario
    const senha = this.login.senha_usuario == undefined ? "" : this.login.senha_usuario

    if(this.configService.bancoDados() == "sqllite"){
      await this.loginLocal(email, senha);
    }
    else{
      await this.loginNuvem();
    }

    if(this.usuarioLogado != null){
      this.loginok = 2;
      this.usuarios = {};
      this.usuarioService.setGlobalVariable(this.usuarioLogado[0]);// passa o usuario logado para um objeto global

      this.nomeUsuario = this.usuarioLogado[0].nome_usuario;
      this.tipoUsuario = this.usuarioLogado[0].id_tipousuario;

      this.loaderLogin = false;

      this.router.navigate(["/home"]);
    }else{
      this.notificacao("danger", "E-mail ou senha inválida");
      this.nomeUsuario = '';
      this.tipoUsuario = 0;
      this.usuarioService.setGlobalVariable({});
      this.loaderLogin = false;
      this.loginok = 1;
    }
  }

  async loginLocal(email: string, senha: string){
    this.usuarioLogado = await this.usuarioDataBase.login(email, senha);
  }

  async loginNuvem(){
    this.usuarioLogado = await this.usuarioService.login(this.login);
  }

  sair(){
    this.nomeUsuario = '';
    this.usuarioService.setGlobalVariable({});
    this.loginok = 1;
  }

  criarUsuario(){
    this.usuarios = {};
    this.nomeRequired = 0; 
    this.emailRequired = 0;
    this.telefoneRequired = 0;
    this.datanasRequired = 0;
    this.senhaRequired = 0

    this.telefoneOK = true;
    this.emailOK = true;

    this.loginok = 3;
  }

  criarNovoUsuario(): void {
    this.validarCampos();
    this.validarCelular();
    this.validarEmail();
    this.validarSenha();

    if(this.nomeRequired == 0 && this.emailRequired == 0 &&  this.telefoneRequired == 0 &&  this.datanasRequired == 0 && this.senhaRequired == 0){
      var ok: boolean = true;

      if(this.telefoneOK == false){
        ok = false;
      }

      if(this.emailOK == false){
        ok = false;
      }

      if(this.senhaOK == false){
        ok = false;
      }

      if(ok){
        this.usuarios.id_tipousuario = 2;

        this.usuarioService.criarUsuarioPost(this.usuarios).subscribe(result => {
          if(result){
            this.notificacao("sucesso", "Usuário criado com sucesso");
            this.usuarios = {};
            this.loginok = 1;
          }else{
            this.notificacao("danger", "Erro ao criar usuário");
            this.loginok = 3;
          }
        }, error => {
            this.notificacao("danger", "Erro de acesso a API. " + error );
            this.loginok = 3;
        });
      }else{
        this.loginok = 3;
      }
    }  
  }

  validarCelular(){
    if(this.usuarios.telefone_usuario == "" ){
      this.usuarios.telefone_usuario = undefined
      this.notificacao("danger", "Favor preencher o celular.");
      this.telefoneOK = false;
    }else{
      if(this.usuarios.telefone_usuario != undefined && this.usuarios.telefone_usuario.length < 11 ){
        this.notificacao("danger", "Telefone deve ter 11 digitos somando com o DDD.");
        this.telefoneOK = false;
      }else{
        this.telefoneOK = true;
      }
    }
  }

  validarEmail(){
    var email: string = '';
    email = this.usuarios.email_usuario == undefined ? "" : this.usuarios.email_usuario;

    if(email != ""){
      // Expressão regular para validar o formato do email
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!regex.test(email)){
        this.notificacao("danger", "E-mail invalido.");
        this.emailOK = false;
      }else{
        this.emailOK = true;
      }
    }
  }

  validarSenha(){
    if(!(this.usuarios.senha_usuario == undefined || this.usuarios.senha_usuario == "")){
      if(this.usuarios.senha_usuario != undefined && this.usuarios.senha_usuario.length < 8 ){
        this.notificacao("danger", "Senha deve ter pelo menos 8 caracteres.");
        this.senhaOK = false;
      }else{
        this.senhaOK = true;
      }
    }
  }

  validarCampos(){
    if(this.usuarios.nome_usuario == undefined || this.usuarios.nome_usuario == ""){
      this.nomeRequired = 1;
    }else{
      this.nomeRequired = 0;
    }

    if(this.usuarios.email_usuario == undefined || this.usuarios.email_usuario == ""){
      this.emailRequired = 1;
    }else{
      this.emailRequired = 0;
    }

    if(this.usuarios.telefone_usuario == undefined || this.usuarios.telefone_usuario == ""){
      this.telefoneRequired = 1;
    }else{
      this.telefoneRequired = 0;
    }

    if(this.usuarios.data_nascimento_usuario == undefined || this.usuarios.data_nascimento_usuario == ""){
      this.datanasRequired = 1;
    }else{
      this.datanasRequired = 0;
    }

    if(this.usuarios.senha_usuario == undefined || this.usuarios.senha_usuario == ""){
      this.senhaRequired = 1;
    }else{
      this.senhaRequired = 0;
    }
  }

  voltar(){
    this.loginok = 1;
  }

  notificacao(tipo: string, msg: string){
    
    if(tipo == "sucesso"){
      this.toastr.success('', msg);
    }
  
    if(tipo == "danger"){
      this.toastr.error('', msg);
    }
  
    if(tipo == "info"){
      this.toastr.info('', msg);
    }
  }

  // TESTE DE SQLITE ///////////////////////////////////////////////////////////////////////////////////////
  // TESTE DE SQLITE ///////////////////////////////////////////////////////////////////////////////////////
  // TESTE DE SQLITE ///////////////////////////////////////////////////////////////////////////////////////

  testeSqlite(){
    this.loginok = 4
  }

  book_name: string;
  book_price: string;

  id_usuarios: number;
  bookData:book[];
  usuarioLogadoTeste: Usuario[];
  
  createOpenDatabase(){
    this.testeDataBase.createOpenDatabase();
  }

  createTable(){
    this.testeDataBase.createTable();
  }

  insertData(){
    this.testeDataBase.insertData(this.book_name, this.book_price);
  }

  selectData(){
    this.bookData = this.testeDataBase.selectData();
  }

  createOpenDatabaseUsuario(){
    this.inicioDataBase.createOpenDatabase();
  }

  selectDataUsuario(){
    this.usuarioLogadoTeste = this.usuarioDataBase.selectData();
  }

  deletarUsuario(){
    this.usuarioDataBase.deletarUsuario(this.id_usuarios);
  }

}

class book{
  public book_name:string;
  public book_price:string;
}



