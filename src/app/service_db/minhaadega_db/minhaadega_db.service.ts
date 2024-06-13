import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})

export class MinhaAdegaDataBase {
    db:SQLiteObject;

    constructor(private sqlite: SQLite) {}

    async createTable_MinhaAdega(db:SQLiteObject): Promise<void>{
        this.db=db;
        //alert('vai criada table minhaadega');
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS minhaadega (
                idminhaadega INTEGER PRIMARY KEY AUTOINCREMENT, 
                id_usuarios INTEGER NOT NULL,
                idWhisky INTEGER 
            )`, [])
        .then((result) => {
            //alert('table minhaadega criada');
        } )
        .catch(e => alert(JSON.stringify(e))); 
        
    }

    
}