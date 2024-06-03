import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { Login } from 'src/app/model/login.model';
import { UsuarioService } from '../service/usuario/usuario.service';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', 'app-login.component.scss'],
})
export class AppComponent {
  public loginok: number = 1;
  public login: Login = {};
  public usuarios: Usuario = {};
  public usuarioLogado: Usuario[] = [] ;

  public nomeUsuario: any;
  public tipoUsuario: any;

  constructor(private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
  ) {}

  fazerLogin(){
    if(this.login.email_usuario == ''){
      this.notificacao("danger", "Digite o e-mail de usuário.");
    }
    if(this.login.senha_usuario == ''){
      this.notificacao("danger", "Digite a senha de usuário.");
    }

    if(this.login.email_usuario != '' && this.login.senha_usuario != ''){
      //this.loaderLogin = true;
      this.usuarioService.login(this.login).subscribe(result => { 
        if(result.length == 1){
          this.loginok = 2;
          this.usuarios = {};
          this.usuarioLogado = result;

          this.usuarioService.setGlobalVariable(this.usuarioLogado[0]);// passa o usuario logado para um objeto global

          this.nomeUsuario = this.usuarioLogado[0].nome_usuario;
          this.tipoUsuario = this.usuarioLogado[0].id_tipousuario;

          //this.loaderLogin = false;

          this.router.navigate(["/home"]);
        }else{
          this.notificacao("danger", "E-mail ou senha inválida");
          this.nomeUsuario = '';
          this.tipoUsuario = 0;
          this.usuarioService.setGlobalVariable({});
          //this.loaderLogin = false;
          this.loginok = 1;
        }
      }, error => {
          this.notificacao("danger", "Erro de acesso a API. " + error );
          this.nomeUsuario = '';
          this.tipoUsuario = 0;
          this.usuarioService.setGlobalVariable({});
          //this.loaderLogin = false;
          this.loginok = 1;
      });   
    }
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
}
