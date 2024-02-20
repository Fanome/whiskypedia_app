import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoWhisky } from '../../model/tipowhisky.model';

@Injectable({
  providedIn: 'root'
})
export class TipowhiskyService {

  //////// Local 
  // public tipowhiskyGetAllURL = 'http://localhost:3001/api/tipowhiskys';
  // public criartipowhiskyPostAllURL = 'http://localhost:3001/api/tipowhisky/incluir';
  // public editartipowhiskyPutAllURL = 'http://localhost:3001/api/tipowhisky/alterar';
  // public excluirtipowhiskyPostAllURL = 'http://localhost:3001/api/tipowhisky';

  //////// Nuvem 
  public tipowhiskyGetAllURL = 'https://whiskypedia.onrender.com/api/tipowhiskys';
  public criartipowhiskyPostAllURL = 'https://whiskypedia.onrender.com/api/tipowhisky/incluir';
  public editartipowhiskyPutAllURL = 'https://whiskypedia.onrender.com/api/tipowhisky/alterar';
  public excluirtipowhiskyPostAllURL = 'https://whiskypedia.onrender.com/api/tipowhisky';

  constructor(private http: HttpClient) {}

  listarALL()  { 
    return this.http.get<TipoWhisky[]>(`${this.tipowhiskyGetAllURL}`);
  }

  criartipowhiskyPost(data: any) {
    console.log(data);
    return  this.http.post(this.criartipowhiskyPostAllURL, data);
  }

  editartipowhiskyPut(data: any) {
    console.log(data);
    return  this.http.put(this.editartipowhiskyPutAllURL, data);
  }

  excluirtipowhiskyPost(data: any) {
    console.log(data);
    return  this.http.delete(this.excluirtipowhiskyPostAllURL + '/' + data.idTipoWhisky);
  }
}