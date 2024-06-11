import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class TesteDataBase {
  db:SQLiteObject;
  book_name: string;
  book_price: string;
  bookData:book[];

  constructor(private sqlite: SQLite) {}

  createOpenDatabase(){
    try{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db=db;
          alert('database created/opened');
        })
        .catch(e => alert(JSON.stringify(e)))
    }
    catch(err:any){
      alert(err);
    }
  }

  createTable(){
    this.db.executeSql('create table IF NOT EXISTS books(name VARCHAR(32), price VARCHAR(10))', [])
    .then((result) => alert('table created'))
    .catch(e => alert(JSON.stringify(e)));
  }

  insertData(book_name:string, book_price:string){
    let query:string='insert into books(name,price) values("'+ book_name +'","'+ book_price +'")';
    this.db.executeSql(query,[])
    .then(() => alert('Record inserted'))
      .catch(e => alert(JSON.stringify(e)));
  }

  selectData(){
    this.bookData=[];
    this.db.executeSql('select * from books',[])
    .then((result) => {
      for(let i=0; i<result.rows.length;i++)
      {
        this.bookData.push({book_name:result.rows.item(i).name,
          "book_price":result.rows.item(i).price
        });
      }
    })
    .catch(e => alert(JSON.stringify(e)));

    return this.bookData;
  }
}

class book{
  public book_name:string;
  public book_price:string;
}
