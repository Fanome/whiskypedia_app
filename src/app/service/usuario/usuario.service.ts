import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario.model';
import { ConfigService } from '../../service/config/config-service';
import { Login } from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario_global: Usuario = {}; 

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public LoginUsuario = '/api/usuario/login';
  public criarUsuarioPostAllURL = '/api/usuario/incluir';

  setGlobalVariable(value: any) {
    this.usuario_global = value;
  }

  getGlobalVariable() {
    return this.usuario_global;
  }

  criarUsuarioPost(usuario: Usuario): Observable<any> {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criarUsuarioPostAllURL;
    return  this.http.post<any>(url, usuario);
  };

  login(login: Login): Observable<any> {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.LoginUsuario + '/' + login.email_usuario + '/' + login.senha_usuario ;
    return  this.http.get<any>(url);
  };


}