import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../../model/fabricante.model';
import { ConfigService } from '../../service/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  fabricantes: Fabricante[] = [];

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

  async listarALLAsync(): Promise<any> {
    try {
      this.ambiente = this.configService.buscarAmbiente();
      const url = this.ambiente + this.fabricanteGetAllURL;
      return await this.http.get<Fabricante[]>(url).toPromise();
    } catch (error) {
      console.error('Erro ao obter dados da API de fabricantes:', error);
      throw error;
    }
  }

  criarFabricantePost(data: any) {
    this.ambiente = this.configService.buscarAmbiente()
    const url = this.ambiente + this.criarfabricantePostAllURL;
    console.log(url);
    return  this.http.post(url, data);
  }

  async criarFabricantePostAsync(data: any): Promise<any> {
    try {
      this.ambiente = this.configService.buscarAmbiente()
      const url = this.ambiente + this.criarfabricantePostAllURL;

      console.log(url);
      return this.http.post(url, data);
    } catch (error) {
      console.error('Erro ao criar fabricantes:', error);
      throw error;
    }
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