import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {


  user!: IUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user ={} as IUser;
    this.getUser();
  }

  getUser() {
 this.userService.getUserById(1).subscribe((result)=>{
   console.log(result)
   this.user.id = result.id;
 })
  }

}
