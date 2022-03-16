import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) {}
  signUpForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    // role: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  submitPost(): void {
    const user: User = this.signUpForm.value;
    console.log(user);
    console.log(typeof(user));
    this.authService.signUp(user);
  }
}