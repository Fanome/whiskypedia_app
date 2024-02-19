import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../../model/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  //////// Local 
  public fabricanteGetAllURL = 'http://localhost:3001/api/fabricantes';
                        
  //////// Nuvem 
  //public fabricanteGetAllURL = 'https://whiskypedia.onrender.com/api/fabricantes';

  constructor(private http: HttpClient) {}

  listarALL()  {
    console.log('ta no servico'); 
    return this.http.get<Fabricante[]>(`${this.fabricanteGetAllURL}`);
  }
}