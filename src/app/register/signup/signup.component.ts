import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userArray } from 'src/app/mock-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userVariable: userInterface[] = [];

  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;

  constructor(private userObj: UserCredService) {}

  ngOnInit(): void {
    this.userObj.getUserFromService().subscribe((u) => (this.userVariable = u));
  }

  onSubmit() {
    const newUser = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      password: this.password,
    };

    console.log(newUser);
    this.userObj
      .addUserFromService(newUser)
      .subscribe((u) => this.userVariable.push(newUser));
  }
}
