import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whisky } from '../../model/whisky.model';
import { ConfigService } from '../../service/config/config-service';
import { WhiskyPaginado } from '../../model/whiskyPaginado.model';

@Injectable({
  providedIn: 'root'
})
export class MinhaAdegaService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public minhaadegaGetAllURL = '/api/minhaadega';
  public minhaadegaGetAllURLPaginado = '/api/minhaadega/paginado';


  listarALL()  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.minhaadegaGetAllURL;
    return this.http.get<Whisky[]>(`${url}`);
  } 

  listarALLPaginado(idusuario: number, pageNumber: number, pageSize: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.minhaadegaGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }

  listarWhiskyPesquisaPaginado(idusuario: number, pageNumber: number, pageSize: number, pesquisa: string)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.minhaadegaGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize + '/' + pesquisa  ;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }
}