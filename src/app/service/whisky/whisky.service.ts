import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whisky } from '../../model/whisky.model';
import { ConfigService } from '../../service/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class WhiskyService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public whiskyGetAllURL = '/api/whiskys';
  public criarwhiskyPostAllURL = '/api/whisky/incluir';
  public editarwhiskyPutAllURL = '/api/whisky/alterar';
  public excluirwhiskyPostAllURL = '/api/whisky';


  listarALL()  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.whiskyGetAllURL;
    return this.http.get<Whisky[]>(`${url}`);
  }

  criarwhiskyPost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criarwhiskyPostAllURL;
    return  this.http.post(url, data);
  }

  editarwhiskyPut(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.editarwhiskyPutAllURL;
    return  this.http.put(url, data);
  }

  excluirwhiskyPost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.excluirwhiskyPostAllURL;
    return  this.http.delete(url + '/' + data.idWhisky);
  }
}