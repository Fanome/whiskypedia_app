import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    buscarAmbiente()  {
        return "http://localhost:3003";
        //return "https://whiskypedia.onrender.com"; 
    }

    buscarAmbienteLocal()  {
      return "http://localhost:3003";
    }

    bancoDados(){
      return "mysql";
      //return "sqllite"
    }
}