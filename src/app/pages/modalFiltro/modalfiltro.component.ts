import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modalfiltro.component.html',
  styleUrls: ['./modalfiltro.component.scss']
})
export class ModelFiltroComponent {
  
    public aus: string = "";
    opcoes: string[] = ['Fabricante', 'Tipo Whisky', 'Pais'];
    opcaoSelecionada: string = "";

    constructor(
        public dialogRef: MatDialogRef<ModelFiltroComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        this.aus = data.item;
    }

    cancelar(): void{
        this.dialogRef.close();
    }

    ordenar(){

    }
}

