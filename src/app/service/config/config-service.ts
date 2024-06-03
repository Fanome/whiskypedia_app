import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    buscarAmbiente()  {
        return "http://localhost:3002";
        //return "https://whiskypedia.onrender.com"; 
    }

    buscarAmbienteLocal()  {
      return "http://localhost:3001";
    }
}