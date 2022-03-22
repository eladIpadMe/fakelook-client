import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  showLeft: boolean = true;
  showRight: boolean = false;
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }


  selectedSideBarLeft(){
    this.showLeft = true;
    this.showRight = false;
  }

  selectedSideBarRight(){
    this.showLeft = false;
    this.showRight = true;  }
}
