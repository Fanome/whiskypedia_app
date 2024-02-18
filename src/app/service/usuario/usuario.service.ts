import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  //////// Local 
  //public criarUsuarioPostAllURL = 'http://localhost:3000/api/usuario/incluir';
                        

  //////// Nuvem 
  public criarUsuarioPostAllURL = 'https://whiskypedia.onrender.com/api/usuario/incluir';

  constructor(private http: HttpClient) {}

  criarUsuarioPost(usuario: Usuario): Observable<any> {
    console.log(usuario);
    return  this.http.post<any>(this.criarUsuarioPostAllURL, usuario);
  }
}