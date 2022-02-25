import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-dash',
  templateUrl: './register-dash.component.html',
  styleUrls: ['./register-dash.component.css'],
})
export class RegisterDashComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let signupDiv: HTMLDivElement = document.querySelector('.signup-div');
    signupDiv.style.display = 'none';
  }
}
