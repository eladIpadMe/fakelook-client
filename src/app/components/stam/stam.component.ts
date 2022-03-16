import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stam',
  templateUrl: './stam.component.html',
  styleUrls: ['./stam.component.scss']
})
export class StamComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNewPost(){
    this.router.navigateByUrl('/createPost');
  }
}
