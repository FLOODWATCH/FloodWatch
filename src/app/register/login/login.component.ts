import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userVariable: userInterface[] = [];
  constructor(private userObj: UserCredService, private router: Router) { }

  email: string;
  password: string;
  ngOnInit(): void { }

  login() {
    // let emailVar: HTMLInputElement = document.querySelector('#email');
    // let passVar: HTMLInputElement = document.querySelector('#password');
    const first: HTMLInputElement = document.querySelector("#email")
    const second: HTMLInputElement = document.querySelector("#password")

    this.userObj.getUserFromService().subscribe((u) => {
      const theUser = u.find((a: any) => {
        return a.email === this.email && a.password === this.password;
      });
      if (theUser) {
        first.style.borderBottomColor = 'white';
        second.style.borderBottomColor = 'white';
        alert('Login Success');
        this.router.navigate(['dashboard']);
      } else {
        first.style.borderBottomColor = 'red';
        second.style.borderBottomColor = 'red';
        alert('User Not Found');
      }
    });
  }

  toggleSignUpForm() {
    let loginDiv: HTMLDivElement = document.querySelector('.login-div');
    loginDiv.style.display = 'none';
    let signupDiv: HTMLDivElement = document.querySelector('.signup-div');
    signupDiv.style.display = 'block';
  }
}
