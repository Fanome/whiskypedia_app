import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})

export class FavoritoDataBase {
    db:SQLiteObject;

    constructor(private sqlite: SQLite) {}

    async createTable_Favorito(db:SQLiteObject): Promise<void>{
        this.db=db;
        //alert('vai criada table favoritos');
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS favoritos (
                idfavoritos INTEGER PRIMARY KEY AUTOINCREMENT, 
                id_usuarios INTEGER NOT NULL,
                idWhisky INTEGER NOT NULL
            )`, [])
        .then((result) => {
            //alert('table favoritos criada');
        } )
        .catch(e => alert(JSON.stringify(e))); 
        
    }

    
}