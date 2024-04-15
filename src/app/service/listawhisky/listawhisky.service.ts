import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaWhisky } from '../../model/listawhisky.model';
import { ConfigService } from '../../service/config/config-service';
import { ListaWhiskyPaginado } from '../../model/listawhiskyPaginado.model';

@Injectable({
  providedIn: 'root'
})
export class ListaWhiskyService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public listawhiskyGetAllURL = '/api/listawhiskys';
  public listawhiskyGetAllURLPaginado = '/api/listawhiskys/paginado';
  public favoritawhiskyGetAllURL = '/api/listawhiskys/favoritar';
  public desFavoritawhiskyGetAllURL = '/api/listawhiskys/desfavoritar';
  public colocarNaMinhaAdegawhiskyGetAllURL = '/api/listawhiskys/colocarNaMinhaAdega';
  public tirarNaMinhaAdegawhiskyGetAllURL = '/api/listawhiskys/tirarNaMinhaAdega';
  public listawhiskyGetAllURLPaginadoOrdenado = '/api/listawhiskys/paginado/ordenado';

  listarALL(idusuario: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.listawhiskyGetAllURL + '/' + idusuario;
    return this.http.get<ListaWhisky[]>(`${url}`);
  } 

  listarALLPaginado(idusuario: number, pageNumber: number, pageSize: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.listawhiskyGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize;
    let data = this.http.get<ListaWhiskyPaginado>(`${url}`);
    return data;
  }

  listarWhiskyPesquisaPaginado(idusuario: number, pageNumber: number, pageSize: number, pesquisa: string)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.listawhiskyGetAllURLPaginado + '/' + idusuario + '/' + pageNumber + '/' + pageSize + '/' + pesquisa  ;
    let data = this.http.get<any>(`${url}`);
    return data;
  }

  listarWhiskyOrdernarPaginado(idusuario: number, pageNumber: number, pageSize: number, ordenar: string)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.listawhiskyGetAllURLPaginadoOrdenado + '/' + idusuario + '/' + pageNumber + '/' + pageSize + '/' + ordenar  ;
    let data = this.http.get<any>(`${url}`);
    return data;
  }

  favoritar(idusuario: number, idwhisky: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.favoritawhiskyGetAllURL + '/' + idusuario + '/' + idwhisky;
    return this.http.get<any>(`${url}`);
  } 

  desFavoritar(idusuario: number, idwhisky: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.desFavoritawhiskyGetAllURL + '/' + idusuario + '/' + idwhisky;
    return this.http.get<any>(`${url}`);
  }

  colocarNaMinhaAdega(idusuario: number, idwhisky: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.colocarNaMinhaAdegawhiskyGetAllURL + '/' + idusuario + '/' + idwhisky;
    return this.http.get<any>(`${url}`);
  } 

  tirarNaMinhaAdega(idusuario: number, idwhisky: number)  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.tirarNaMinhaAdegawhiskyGetAllURL + '/' + idusuario + '/' + idwhisky;
    return this.http.get<any>(`${url}`);
  }

}