import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './minhaadega.component.html',
  styleUrls: ['./minhaadega.component.scss']
})
export class MinhaAdegaComponent implements OnInit {
    constructor(
        private router: Router,
        private toastr: ToastrService) { }
    
    ngOnInit() {
    }
}