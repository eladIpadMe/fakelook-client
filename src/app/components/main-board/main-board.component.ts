import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/map');
  }

}
