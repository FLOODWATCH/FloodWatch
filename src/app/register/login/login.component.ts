import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { Router } from '@angular/router';
import { userClass } from 'src/app/classes/user-class';
import { UserDataService } from 'src/app/shared-service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userVariable: userInterface[] = [];
  constructor(public userObj: UserCredService, public router: Router) {}

  email: string;
  password: string;
  //////////////////////////////
  name: string;
  mobile: string;
  address: string;
  theUser: userInterface;

  ngOnInit(): void {}

  resetFields() {
    var fieldID = ['#email', '#password'];
    for (let x = 0; x <= fieldID.length; x++) {
      const change: HTMLInputElement = document.querySelector(`${fieldID[x]}`);
      change.value = '';
      change.style.borderColor = 'white';
    }
  }

  login() {
    const first: HTMLInputElement = document.querySelector('#email');
    const second: HTMLInputElement = document.querySelector('#password');
    this.userObj.getUserFromService().subscribe((u) => {
      this.theUser = u.find((a: any) => {
        return a.email === this.email && a.password === this.password;
      });
      if (this.theUser) {
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
    this.resetFields();
  }
}
