import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  forgotPasswordForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    // role: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  submitPost(): void {
    var user: User = this.forgotPasswordForm.value;
    // console.log(user);
    // console.log(typeof(user));
    console.log(this.forgotPasswordForm.controls.password1.value);
    console.log(this.forgotPasswordForm.controls.passwordConfirmation.value);

    if (
      this.forgotPasswordForm.controls.password1.value ===
      this.forgotPasswordForm.controls.passwordConfirmation.value
    ) {
      this.userService.getUserIdByUserName(user.userName).subscribe(
        (res) => {
          if (res != null) {
            user.id = res;
            this.userService.getUserById(user.id).subscribe(
              (userFromDb) => {
                userFromDb.password =
                  this.forgotPasswordForm.controls.password1.value;
                this.userService.updateUser(userFromDb);
              },
              (error) => {
                console.log(error);
              }
            );
            this.userService.updateUser(user);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      alert('passwords updated!');
      this.router.navigateByUrl('/@@@');
    } else alert('passwords are inEqual');
  }
}
