import { Injectable } from '@angular/core';
import { userInterface } from '../user-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;

  // constructor(name, email, mobile, address, password) {
  //   this.setName(name);
  //   this.setEmail(email);
  //   this.setMobile(mobile);
  //   this.setAddress(address);
  //   this.setPassword(password);
  // }

  //name
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  //email
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
  //mobile
  getMobile() {
    return this.mobile;
  }
  setMobile(mobile) {
    this.mobile = mobile;
  }
  //address
  getAddress() {
    return this.address;
  }
  setAddress(address) {
    this.address = address;
  }
  //password
  getPassword() {
    return this.password;
  }
  setPassword(password) {
    this.password = password;
  }
}
