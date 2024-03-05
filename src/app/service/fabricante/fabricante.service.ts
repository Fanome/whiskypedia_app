import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../../model/fabricante.model';
import { ConfigService } from '../../service/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  constructor(private http: HttpClient,  private configService: ConfigService) {}

  public ambiente: string = "";
  public fabricanteGetAllURL = '/api/fabricantes';
  public criarfabricantePostAllURL = '/api/fabricante/incluir';
  public editarfabricantePutAllURL = '/api/fabricante/alterar';
  public excluirfabricantePostAllURL = '/api/fabricante';

  listarALL()  {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.fabricanteGetAllURL;
    return this.http.get<Fabricante[]>(`${url}`);
  }

  criarFabricantePost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criarfabricantePostAllURL;
    return  this.http.post(url, data);
  }

  editarFabricantePut(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.editarfabricantePutAllURL;
    return  this.http.put(url, data);
  }

  excluirFabricantePost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.excluirfabricantePostAllURL;
    return  this.http.delete(url + '/' + data.idFabricante);
  }
}