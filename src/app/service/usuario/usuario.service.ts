import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario.model';
import { ConfigService } from '../../service/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public criarUsuarioPostAllURL = '/api/usuario/incluir';

  criarUsuarioPost(usuario: Usuario): Observable<any> {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criarUsuarioPostAllURL;
    return  this.http.post<any>(url, usuario);
  }
}