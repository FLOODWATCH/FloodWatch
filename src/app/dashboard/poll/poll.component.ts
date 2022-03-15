import { Component, OnInit } from '@angular/core';
import { pollInterface } from 'src/app/poll-interface';
import { PollService } from 'src/app/dashboard-service/poll.service';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userInterface } from 'src/app/user-interface';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  pollVariable: pollInterface[] = [];
  userVarMod: userInterface[] = [];
  pollSafeVote: number;
  pollNotSafeVote: number;

  constructor(
    private pollObj: PollService,
    private userCredObj: UserCredService
  ) {}
  length: userInterface;

  thePoll: pollInterface;

  ngOnInit(): void {
    this.pollObj
      .getPollsFromService()
      .subscribe((p) => (this.pollVariable = p));
  }

  safeIncrement: any;
  safeVote(poll: pollInterface) {
    let safeVote: any = document.querySelectorAll('.safe-vote');

    this.safeIncrement = `${(poll.pollSafeVote += 1)}%`;
    // for (let i = 0; i < this.pollVariable.length; i++) {
    //   safeVote[i].style.width = this.safeIncrement;
    //   console.log(this.safeIncrement);
    // }
    this.pollObj.goVotePollFromService(poll).subscribe();
  }

  notSafeVote(poll: pollInterface) {
    let notSafeVote: any = document.querySelectorAll('.not-safe-vote');

    let notSafeIncrement = `${(poll.pollNotSafeVote += 1)}%`;
    // for (let i = 0; i < this.pollVariable.length; i++) {
    //   notSafeVote[i].style.width = notSafeIncrement;
    //   console.log(notSafeIncrement);
    // }
    this.pollObj.goVotePollFromService(poll).subscribe();
  }
}
