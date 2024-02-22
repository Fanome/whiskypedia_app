import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoWhisky } from '../../model/tipowhisky.model';
import { ConfigService } from '../../service/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class TipowhiskyService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public tipowhiskyGetAllURL = '/api/tipowhiskys';
  public criartipowhiskyPostAllURL = '/api/tipowhisky/incluir';
  public editartipowhiskyPutAllURL = '/api/tipowhisky/alterar';
  public excluirtipowhiskyPostAllURL = '/api/tipowhisky';

  listarALL()  { 
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.tipowhiskyGetAllURL;
    return this.http.get<TipoWhisky[]>(`${url}`);
  }

  criartipowhiskyPost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criartipowhiskyPostAllURL;
    return  this.http.post(url, data);
  }

  editartipowhiskyPut(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.editartipowhiskyPutAllURL;
    return  this.http.put(url, data);
  }

  excluirtipowhiskyPost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.excluirtipowhiskyPostAllURL;
    return  this.http.delete(url + '/' + data.idTipoWhisky);
  }
}