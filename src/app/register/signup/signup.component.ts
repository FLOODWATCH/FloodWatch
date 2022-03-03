import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { userArray } from 'src/app/mock-user';
import { element } from 'protractor';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  displayName = true;
  faTimes = faTimes;
  faExclamation = faExclamation;
  faCheck = faCheck;
  userVariable: userInterface[] = [];
  focus: boolean;
  signupModalMessage: string;
  alert: string;

  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;

  constructor(private userObj: UserCredService) { }

  ngOnInit(): void {
    this.userObj.getUserFromService().subscribe((u) => (this.userVariable = u));

    // const closeMod = document.getElementById("closeMod");
    // closeMod.style.color = 'black';
  }
  resetFields() {
    var fieldID = ['#name', '#em', '#mobile', '#address', '#pw'];
    for (let x = 0; x <= fieldID.length; x++) {
      const change: HTMLInputElement = document.querySelector(`${fieldID[x]}`);
      change.value = "";
      this.changeColor(change, false);
    }
  }
  // Error Indicator
  changeColor(element, bool) {
    // bool is true if error is found
    if (bool) { element.style.borderColor = 'red' }
    else { element.style.borderColor = 'white' }
  }
  // Green Modal
  greenModal() {
    this.displayName = false;
    const greenClose: HTMLInputElement = document.querySelector("#signup-green-icon")
    const modalContent: HTMLInputElement = document.querySelector("#modal-content")
    const modalText: HTMLInputElement = document.querySelector("#modal-ptext")
    const modalIcon: HTMLInputElement = document.querySelector("#icon-modal")
    this.signupModalMessage = 'Success'
    this.alert = 'Account Created'
    modalContent.style.color = 'rgb(39, 165, 87)'
    modalContent.style.borderColor = 'rgb(4, 107, 4)'
    modalContent.style.backgroundColor = 'rgb(191, 238, 201)'
    modalText.style.color = 'rgb(97, 177, 127)'
    modalIcon.style.backgroundColor = 'rgb(39, 165, 87)'
    modalContent.style.borderColor = 'green'
    greenClose.style.display = 'flex'
  }
  // Red Modal
  redModal() {
    this.displayName = true;
    const redClose: HTMLInputElement = document.querySelector("#signup-red-icon")
    const modalContent: HTMLInputElement = document.querySelector("#modal-content")
    const modalText: HTMLInputElement = document.querySelector("#modal-ptext")
    const modalIcon: HTMLInputElement = document.querySelector("#icon-modal")

    this.signupModalMessage = 'Error'
    this.alert = 'Please fill everything'
    modalContent.style.color = '#ad3939'
    modalContent.style.borderColor = 'red'
    modalContent.style.backgroundColor = 'rgb(255, 217, 211)'
    modalText.style.color = 'rgb(214, 111, 111)'
    modalIcon.style.backgroundColor = 'rgb(221, 82, 48)'
    modalContent.style.borderColor = 'red'
    redClose.style.display = 'flex'
  }
  //--------- ALL KEYUP VALIDATORS -----------//
  // Keyup validation for name
  validateName() {
    var checkName: HTMLInputElement = document.querySelector("#name")
    if (checkName.value == '') { checkName.style.borderColor = 'red' }
    else { checkName.style.borderColor = 'white' }
  }
  // Keyup validation for email
  validateEmail() {
    var email: HTMLInputElement = document.querySelector('#em');
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.value.match(pattern)) { email.style.borderColor = 'white' }
    else { email.style.borderColor = 'red' }
  }
  // Keyup validation for mobile no
  mobileValidation() {
    var thisNumber: HTMLInputElement = document.querySelector("#mobile")
    var num = document.getElementById("mobile")

    if (thisNumber.value.match(/[a-z]/g) || thisNumber.value.match(/[A_Z]/g)) {
      thisNumber.style.borderColor = 'red'
    } else {
      // checks if it's all numbers with max length of 11
      if (thisNumber.value.match(/\d/g).length === 11) {
        thisNumber.style.borderColor = 'white'
      } else { thisNumber.style.borderColor = 'red' }
    }
  }
  // Keyup validation for address
  validateAddress() {
    var checkAddress: HTMLInputElement = document.querySelector("#address")
    if (checkAddress.value == '') { checkAddress.style.borderColor = 'red' }
    else { checkAddress.style.borderColor = 'white' }
  }
  // Keyup validation of password
  validatePassword() {
    var pass: HTMLInputElement = document.querySelector("#pw")

    if (
      (pass.value.match(/[a-z]/g) || pass.value.match(/[A_Z]/g)) &&
      pass.value.match(/[0-9]/g)
    ) {
      pass.style.borderColor = 'white'
    } else {
      pass.style.borderColor = 'red'
    }
  }
  //--------- ALL NON-KEYUP VALIDATORS -----------//
  // Validates the email address
  emailValidation() {
    var email: HTMLInputElement = document.querySelector('#em');
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.value.match(pattern)) { return true }
    else { return false }
  }
  // Validates the mobile no.
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
  // Validates if password contains both characters & numbers
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
  // Validates all textfields if valid
  checkFields(name, email, mobile, address, password) {
    // var checkError = true;
    var thisField = [name, email, mobile, address, password];
    var thisID = ['#name', '#em', '#mobile', '#address', '#pw'];
    for (let i = 0; i <= thisID.length; i++) {
      const first = document.querySelector(`${thisID[i]}`);
      const showModal: HTMLDivElement = document.querySelector("#myModal");
      const redClose: HTMLInputElement = document.querySelector("#signup-red-icon");
      // changeColor is true if error is found
      if (!thisField[i]) {
        this.changeColor(first, true);
        // Shows Modal
        // this.signupModalMessage = 'Error'
        // this.alert = 'Please fill everything'
        this.redModal()
        showModal.style.display = 'flex';
        redClose.style.display = 'flex';
      } else if (thisField[i] == email) {
        if (this.emailValidation()) {
          this.changeColor(first, false);
        } else {
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
    const openModal: HTMLDivElement = document.querySelector("#myModal");
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
    }
    else if (!this.emailValidation) {
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
    }
    else {
      this.userObj
        .addUserFromService(newUser)
        .subscribe((u) => this.userVariable.push(newUser));
      this.greenModal()
      openModal.style.display = 'flex'
    }
  }
  toggleLoginForm() {
    let loginDiv: HTMLDivElement = document.querySelector('.login-div');
    loginDiv.style.display = 'block';
    let signupDiv: HTMLDivElement = document.querySelector('.signup-div');
    signupDiv.style.display = 'none';
    this.resetFields();
  }
  // Close button when account is created
  toggleClose() {
    var showModal: HTMLDivElement = document.querySelector("#myModal");
    showModal.style.display = 'none'
    this.toggleLoginForm()
  }
  // Close button when error is found
  closeButton() {
    var showModal: HTMLDivElement = document.querySelector("#myModal");
    showModal.style.display = 'none';
  }
  checkKey() {
    var myName: HTMLInputElement = document.querySelector("#name");
    if (myName.value.length < 11 && myName.value != '') {
      myName.style.borderColor = "red";
    } else {
      myName.style.borderColor = "white";
    }
  }
}
