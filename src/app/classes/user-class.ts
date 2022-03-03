export class userClass {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;

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
