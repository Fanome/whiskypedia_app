import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../../model/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  //////// Local 
  // public fabricanteGetAllURL = 'http://localhost:3001/api/fabricantes';
  // public criarfabricantePostAllURL = 'http://localhost:3001/api/fabricante/incluir';
  // public editarfabricantePutAllURL = 'http://localhost:3001/api/fabricante/alterar';
  // public excluirfabricantePostAllURL = 'http://localhost:3001/api/fabricante';

  //////// Nuvem 
  public fabricanteGetAllURL = 'https://whiskypedia.onrender.com/api/fabricantes';
  public criarfabricantePostAllURL = 'https://whiskypedia.onrender.com/api/fabricante/incluir';
  public editarfabricantePutAllURL = 'https://whiskypedia.onrender.com/api/fabricante/alterar';
  public excluirfabricantePostAllURL = 'https://whiskypedia.onrender.com/api/fabricante';

  constructor(private http: HttpClient) {}

  listarALL()  {
    console.log('ta no servico'); 
    return this.http.get<Fabricante[]>(`${this.fabricanteGetAllURL}`);
  }

  criarFabricantePost(data: any) {
    console.log(data);
    return  this.http.post(this.criarfabricantePostAllURL, data);
  }

  editarFabricantePut(data: any) {
    console.log(data);
    return  this.http.put(this.editarfabricantePutAllURL, data);
  }

  excluirFabricantePost(data: any) {
    console.log(data);
    return  this.http.delete(this.excluirfabricantePostAllURL + '/' + data.idFabricante);
  }
}