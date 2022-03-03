import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { LoginComponent } from 'src/app/register/login/login.component';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userClass } from 'src/app/classes/user-class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends LoginComponent implements OnInit {
  userVariable: userInterface[] = [];
  constructor(public userObj: UserCredService, public router: Router) {
    super(userObj, router);
  }
  phoneField: HTMLInputElement = document.querySelector('#phone');
  passField: HTMLInputElement = document.querySelector('#pass');

  profileName: string = 'something went wrong';
  profileEmail: string = 'something went wrong';
  profileMobile: string = 'something went wrong';
  profileAddress: string = 'something went wrong';

  ngOnInit(): void {
    super.ngOnInit();
  }
  secret() {
    let phoneField: HTMLInputElement = document.querySelector('#phone');
    let passField: HTMLInputElement = document.querySelector('#pass');
    this.profileAddress = phoneField.value;
    console.log(phoneField.value);
    console.log(passField.value);
  }
}
