import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whisky } from '../../model/whisky.model';

@Injectable({
  providedIn: 'root'
})
export class WhiskyService {

  //////// Local 
  // public whiskyGetAllURL = 'http://localhost:3001/api/whiskys';
  // public criarwhiskyPostAllURL = 'http://localhost:3001/api/whisky/incluir';
  // public editarwhiskyPutAllURL = 'http://localhost:3001/api/whisky/alterar';
  // public excluirwhiskyPostAllURL = 'http://localhost:3001/api/whisky';

  //////// Nuvem 
  public whiskyGetAllURL = 'https://whiskypedia.onrender.com/api/whiskys';
  public criarwhiskyPostAllURL = 'https://whiskypedia.onrender.com/api/whisky/incluir';
  public editarwhiskyPutAllURL = 'https://whiskypedia.onrender.com/api/whisky/alterar';
  public excluirwhiskyPostAllURL = 'https://whiskypedia.onrender.com/api/whisky';

  constructor(private http: HttpClient) {}

  listarALL()  { 
    return this.http.get<Whisky[]>(`${this.whiskyGetAllURL}`);
  }

  criarwhiskyPost(data: any) {
    console.log(data);
    return  this.http.post(this.criarwhiskyPostAllURL, data);
  }

  editarwhiskyPut(data: any) {
    console.log(data);
    return  this.http.put(this.editarwhiskyPutAllURL, data);
  }

  excluirwhiskyPost(data: any) {
    console.log(data);
    return  this.http.delete(this.excluirwhiskyPostAllURL + '/' + data.idWhisky);
  }
}