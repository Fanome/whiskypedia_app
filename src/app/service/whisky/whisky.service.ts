import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whisky } from '../../model/whisky.model';
import { ConfigService } from '../../service/config/config-service';
import { WhiskyPaginado } from '../../model/whiskyPaginado.model';

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
  public whiskyGetAllURLPaginado = '/api/whiskys/paginado';

  public whiskyGetRangerURL = '/api/whiskys/getranger';


  listarALL(){ 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.whiskyGetAllURL;
    return this.http.get<Whisky[]>(`${url}`);
  } 

  listarRengeID(num1: number, num2: number){ 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.whiskyGetRangerURL + '/' + num1 + '/' + num2;
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

  listarALLPaginado(pageNumber: number, pageSize: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.whiskyGetAllURLPaginado + '/' + pageNumber + '/' + pageSize;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }

  listarWhiskyPesquisaPaginado(pageNumber: number, pageSize: number, pesquisa: string)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.whiskyGetAllURLPaginado + '/' + pageNumber + '/' + pageSize + '/' + pesquisa  ;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }
} 