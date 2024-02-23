import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './meusfavoritos.component.html',
  styleUrls: ['./meusfavoritos.component.scss']
})
export class MeusFavoritosComponent implements OnInit {
    constructor(
        private router: Router,
        private toastr: ToastrService) { }
    
    ngOnInit() {
    }
}