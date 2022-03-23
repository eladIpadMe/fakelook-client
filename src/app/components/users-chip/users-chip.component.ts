import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-chip',
  templateUrl: './users-chip.component.html',
  styleUrls: ['./users-chip.component.scss']
})
export class UsersChipComponent implements OnInit {
separatorKeysCodes: number[] = [ENTER, COMMA];

currentUser?: User;
userCtrl = new FormControl();
users: string[] = [];
allUsers: User[] = [];
allUsersNames: string[] = [];
filteredUsers: Observable<string[]>;
@Input() placeHolder: string;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @Output() usersTaggedInComment = new EventEmitter<string[]>();
  @Output() publishersAdded = new EventEmitter<string[]>();
  

  constructor(private userService: UserService) {
    //get all users accept current
    const currentUserId = Number(sessionStorage.getItem('id'));
    this.userService.getUserById(currentUserId).subscribe(u=>
      this.currentUser = u,
      (error)=> console.log(error));
    this.userService.getAllUsers().subscribe((users)=>{
      users.forEach(u => {
        if(u.userName !== this.currentUser?.userName)
          this.allUsers.push(u);
          this.allUsersNames[<number>u.id] = u.userName;
        })
        this.allUsersNames = this.allUsersNames.slice(1);
        //console.log(this.allUsers);
        this.filteredUsers = this.userCtrl.valueChanges.pipe(
          startWith(null),
          map((user: string | null) => (user ? this._userFilter(user) : this.allUsersNames.slice())),
        );
        console.log(this.allUsersNames);
        console.log(this.filteredUsers);
    },
  (error)=> console.log(error));
   }

  ngOnInit(): void {
  }
  addUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  removeUser(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selectedUsers(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value= '';
    this.userCtrl.setValue(null);

    this.publishersAdded.emit(this.users);
    this.usersTaggedInComment.emit(this.users);
  }

  private _userFilter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allUsersNames.filter(user => user.toLowerCase().includes(filterValue));
  }
}
