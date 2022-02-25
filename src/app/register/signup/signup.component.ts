import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userArray } from 'src/app/mock-user';
import { element } from 'protractor';

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
  // Error Indicator
  changeColor(element, bool) {
    if (bool) {
      // bool is true if error is found
      element.style.borderColor = 'red';
    } else {
      element.style.borderColor = 'black';
    }
  }
  // Validates the email address
  emailValidation() {
    var email: HTMLInputElement = document.querySelector('#em');
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }
  // Validates the phone no.
  phoneValidation(num) {
    if (num.match(/[a-z]/g) || num.match(/[A_Z]/g)) {
      return false;
    } else {
      // checks if it's all numbers with max length of 11
      if (num.match(/\d/g).length === 11) {
        return true;
      }
    }
  }
  // checks if password contains both characters & numbers
  passwordValidation(pass) {
    if (
      (pass.match(/[a-z]/g) || pass.match(/[A_Z]/g)) &&
      pass.match(/[0-9]/g)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // Checks all textfields if valid
  checkFields(name, email, mobile, address, password) {
    var thisField = [name, email, mobile, address, password];
    var thisID = ['#name', '#em', '#mobile', '#address', '#pw'];
    for (let i = 0; i <= thisID.length; i++) {
      const first = document.querySelector(`${thisID[i]}`);

      // changeColor is true if error is found
      if (!thisField[i]) {
        this.changeColor(first, true);
      } else if (thisField[i] == email) {
        if (this.emailValidation()) {
          this.changeColor(first, false);
        } else {
          this.emailValidation();
          this.changeColor(first, true);
        }
      } else if (thisField[i] == mobile) {
        if (this.phoneValidation(thisField[i])) {
          this.changeColor(first, false);
        } else {
          this.changeColor(first, true);
        }
      } else if (thisField[i] == password) {
        if (this.passwordValidation(thisField[i])) {
          this.changeColor(first, false);
        } else {
          this.changeColor(first, true);
        }
      } else {
        this.changeColor(first, false);
      }
    }
  }
  addUser() {
    const newUser = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      password: this.password,
    };
    // Checks inputs
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.mobile ||
      !newUser.address ||
      !newUser.password
    ) {
      this.checkFields(
        newUser.name,
        newUser.email,
        newUser.mobile,
        newUser.address,
        newUser.password
      );
    } else if (!this.emailValidation) {
      this.checkFields(
        newUser.name,
        newUser.email,
        newUser.mobile,
        newUser.address,
        newUser.password
      );
    } else if (!this.phoneValidation(newUser.mobile)) {
      this.checkFields(
        newUser.name,
        newUser.email,
        newUser.mobile,
        newUser.address,
        newUser.password
      );
    } else if (!this.passwordValidation(newUser.password)) {
      this.checkFields(
        newUser.name,
        newUser.email,
        newUser.mobile,
        newUser.address,
        newUser.password
      );
    } else {
      alert('Successfull!');
      this.userObj
        .addUserFromService(newUser)
        .subscribe((u) => this.userVariable.push(newUser));
    }
  }

  toggleLoginForm() {
    let loginDiv: HTMLDivElement = document.querySelector('.login-div');
    loginDiv.style.display = 'block';
    let signupDiv: HTMLDivElement = document.querySelector('.signup-div');
    signupDiv.style.display = 'none';
  }
}
