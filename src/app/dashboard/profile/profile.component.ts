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
    //for profile animations---------------------------start
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    window.onload = function () {
      var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }

      var css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
      document.body.appendChild(css);
    };
    //for profile animations---------------------------end
  }
  secret() {
    let phoneField: HTMLInputElement = document.querySelector('#phone');
    let passField: HTMLInputElement = document.querySelector('#pass');
    this.profileAddress = phoneField.value;
    console.log(phoneField.value);
    console.log(passField.value);
  }
}
