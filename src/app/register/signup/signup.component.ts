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
  random: string = 'samp';

  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;

  constructor(private userObj: UserCredService) { }

  ngOnInit(): void {
    this.userObj.getUserFromService().subscribe((u) => (this.userVariable = u));
  }

  // clears all input fields
  clearField() {

    // var inputs = document.querySelectorAll('input');
    // inputs.forEach(input => input.value = '');
    // var inputs = document.getElementsByTagName("input");
    // for (var i = 0; i < inputs.length; i++)
    //   inputs[i].value = '';
    //  onkeypress="if(this.value.match(/\D/)) this.value=this.value.replace(/\D/g,'')"
    //     onkeyup="if(this.value.match(/\D/)) this.value=this.value.replace(/\D/g,'')"
  }
  validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
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
    // Checks input
    if (!newUser.name || !newUser.email || !newUser.mobile || !newUser.address || !newUser.password) {
      alert("Fill everything");
    }
    else if (this.mobile.length < 11) {
      alert('Must be 11 numbers');
      this.clearField();
      // var inputs = document.getElementsByTagName("input");
      // for (var i = 0; i < inputs.length; i++)
      //   inputs[i].value = '';
    }
    else if (isNaN(Number(this.mobile))) {
      alert('numbers only');
      this.clearField();
    }
    else {
      alert('Successfull!')
      this.userObj
        .addUserFromService(newUser)
        .subscribe((u) => this.userVariable.push(newUser));
    }
    // this.userObj
    //   .addUserFromService(newUser)
    //   .subscribe((u) => this.userVariable.push(newUser));
  }

}
