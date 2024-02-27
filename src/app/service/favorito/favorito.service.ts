import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Whisky } from '../../model/whisky.model';
import { ConfigService } from '../../service/config/config-service';
import { WhiskyPaginado } from '../../model/whiskyPaginado.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public favoritoGetAllURL = '/api/favorito';
  public favoritoGetAllURLPaginado = '/api/favorito/paginado';


  listarALL()  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.favoritoGetAllURL;
    return this.http.get<Whisky[]>(`${url}`);
  } 

  listarALLPaginado(idusuario: number, pageNumber: number, pageSize: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.favoritoGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }

  listarWhiskyPesquisaPaginado(idusuario: number, pageNumber: number, pageSize: number, pesquisa: string)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.favoritoGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize + '/' + pesquisa  ;
    let data = this.http.get<WhiskyPaginado>(`${url}`);
    return data;
  }
}