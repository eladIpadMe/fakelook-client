import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { PostsFormComponent } from '../posts-form/posts-form.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  showLeft: boolean = true;
  showRight: boolean = false;
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
  }


  selectedSideBarLeft(){
    this.showLeft = true;
    this.showRight = false;
  }

  selectedSideBarRight(){
    this.showLeft = false;
    this.showRight = true;  
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(PostsFormComponent);
      dialogRef.afterClosed().subscribe();
  }
  onNoClick(){

  }
}
