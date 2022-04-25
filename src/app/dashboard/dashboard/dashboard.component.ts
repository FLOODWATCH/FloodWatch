import { Component, OnInit } from '@angular/core';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userInterface } from 'src/app/user-interface';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private userObj: UserCredService) { }
  faTimes = faTimes;
  faExclamation = faExclamation;
  faCheck = faCheck;
  phone: string;
  pass: string;
  messageType: string;
  modalMessage: string;
  theUser: userInterface;

  ngOnInit(): void {
    let confirmInfoDiv: HTMLDivElement =
      document.querySelector('.confirm-info');
    confirmInfoDiv.style.display = 'none';
    //////////////////////////////////////////////////////////////// MAKE IT SHOW!!!!!!!!
  }

  // Modal Message related Functions
  closeModalDashboard() {
    const closeModal: HTMLDivElement =
      document.querySelector('#dashboard-modal');
    closeModal.style.display = 'none';
  }
  reEnterSubmit() {
    this.userObj.getUserFromService().subscribe((u) => {
      this.theUser = u.find((a: any) => {
        return a.mobile === this.phone && a.password === this.pass;
      });
      if (this.theUser) {
        alert(
          'Thank you Watchers!, you can now recieve SMS notification not only through the hardware part but also by the help of this FlooodWatch Web App.'
        );
        //call the html elements of profile compenent to pass in the [theUser] values
        let profNameVar: HTMLHeadingElement =
          document.querySelector('#profileName');
        profNameVar.textContent = this.theUser.name;
        let profEmailVar: HTMLParagraphElement =
          document.querySelector('#profileEmail');
        profEmailVar.textContent = this.theUser.email;
        let profMobileVar: HTMLParagraphElement =
          document.querySelector('#profileMobile');
        profMobileVar.textContent = this.theUser.mobile;
        let profAddressVar: HTMLParagraphElement =
          document.querySelector('#profileAddress');
        profAddressVar.textContent = this.theUser.address;

        //hide re enter phone num and password
        let confirmInfoDiv: HTMLDivElement =
          document.querySelector('.confirm-info');
        confirmInfoDiv.style.display = 'none';
      } else {
        alert("The details you've entered didn't match.");
      }
    });
  }
}
