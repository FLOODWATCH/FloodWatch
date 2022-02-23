import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userVariable: userInterface[] = [];
  constructor(private userObj: UserCredService) {}

  email: string;
  password: string;
  ngOnInit(): void {}

  login() {
    // let emailVar: HTMLInputElement = document.querySelector('#email');
    // let passVar: HTMLInputElement = document.querySelector('#password');

    this.userObj.getUserFromService().subscribe((u) => {
      const theUser = u.find((a: any) => {
        return a.email === this.email && a.password === this.password;
      });
      if (theUser) {
        alert('Login Success');
      } else {
        alert('User Not Found');
      }
    });
  }
}
