import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/user-interface';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { userClass } from 'src/app/classes/user-class';
import { UserDataService } from 'src/app/shared-service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  changeIcon = true;
  faTimes = faTimes;
  faCheck = faCheck;
  faExclamation = faExclamation;
  errorAlert: string;
  loginModalMessage: string;
  userVariable: userInterface[] = [];
  constructor(public userObj: UserCredService, public router: Router) { }

  email: string;
  password: string;
  //////////////////////////////
  name: string;
  mobile: string;
  address: string;
  theUser: userInterface;

  ngOnInit(): void { }

  // Green Modal
  greenModal() {
    const secModal: HTMLInputElement = document.querySelector("#login-green-icon")
    const modalContent: HTMLInputElement = document.querySelector("#login-modal-content")
    const modalText: HTMLInputElement = document.querySelector("#login-modal-ptext")
    const modalIcon: HTMLInputElement = document.querySelector("#login-icon-modal")
    this.loginModalMessage = 'Success'
    this.errorAlert = 'Login Success'
    modalContent.style.color = 'rgb(39, 165, 87)'
    modalContent.style.borderColor = 'rgb(4, 107, 4)'
    modalContent.style.backgroundColor = 'rgb(191, 238, 201)'
    modalText.style.color = 'rgb(97, 177, 127)'
    modalIcon.style.backgroundColor = 'rgb(39, 165, 87)'
    modalContent.style.borderColor = 'green'
    secModal.style.display = 'flex'
  }
  // Red Modal
  redModal() {
    const thisModal: HTMLInputElement = document.querySelector("#login-red-icon")
    const modalContent: HTMLInputElement = document.querySelector("#login-modal-content")
    const modalText: HTMLInputElement = document.querySelector("#login-modal-ptext")
    const modalIcon: HTMLInputElement = document.querySelector("#login-icon-modal")

    this.loginModalMessage = 'Error'
    this.errorAlert = 'Please fill everything'
    modalContent.style.color = '#ad3939'
    modalContent.style.borderColor = 'red'
    modalContent.style.backgroundColor = 'rgb(255, 217, 211)'
    modalText.style.color = 'rgb(214, 111, 111)'
    modalIcon.style.backgroundColor = 'rgb(221, 82, 48)'
    modalContent.style.borderColor = 'red'
    thisModal.style.display = 'flex'
  }

  // Check Email
  checkEmail() {
    const getEmail: HTMLInputElement = document.querySelector("#email")
    if (getEmail.value == '') { getEmail.style.borderColor = 'red' }
    else { getEmail.style.borderColor = 'white' }
  }
  // Check Password
  checkPassword() {
    const getPassword: HTMLInputElement = document.querySelector("#password")
    if (getPassword.value == '') { getPassword.style.borderColor = 'red' }
    else { getPassword.style.borderColor = 'white' }
  }
  resetFields() {
    var fieldID = ['#email', '#password'];
    for (let x = 0; x <= fieldID.length; x++) {
      const change: HTMLInputElement = document.querySelector(`${fieldID[x]}`);
      change.value = '';
      change.style.borderColor = 'white';
    }
  }

  login() {
    const first: HTMLInputElement = document.querySelector("#email")
    const second: HTMLInputElement = document.querySelector("#password")
    // const checkEmail: HTMLInputElement = document.querySelector("#email")
    const openModal: HTMLDivElement = document.querySelector("#my-modal")

    this.userObj.getUserFromService().subscribe((u) => {
      this.theUser = u.find((a: any) => {
        return a.email === this.email && a.password === this.password;
      });
      if (this.theUser) {
        this.changeIcon = false;
        first.style.borderBottomColor = 'white';
        second.style.borderBottomColor = 'white';
        this.greenModal()
        openModal.style.display = 'flex'
        // this.router.navigate(['dashboard']);
      } else {
        if (first.value == '' || second.value == '') {
          this.changeIcon = true;
          this.redModal()
          this.checkEmail()
          this.checkPassword()
          // this.thisModal = 'Please fill everything'
          openModal.style.display = 'flex'
        } else {
          // first.style.borderBottomColor = 'red';
          // second.style.borderBottomColor = 'red';
          this.changeIcon = true;
          this.redModal()
          this.loginModalMessage = 'Error'
          this.errorAlert = 'User not found'
          openModal.style.display = 'flex';
        }
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
  closeSuccessModal() {
    this.router.navigate(['dashboard']);
  }
  closeButton() {
    var closeBtn: HTMLDivElement = document.querySelector("#my-modal");
    closeBtn.style.display = 'none';
  }
}
