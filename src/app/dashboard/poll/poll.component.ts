import { Component, OnInit } from '@angular/core';
import { pollInterface } from 'src/app/poll-interface';
import { PollService } from 'src/app/dashboard-service/poll.service';
import { UserCredService } from 'src/app/register-services/user-cred.service';
import { userInterface } from 'src/app/user-interface';
import { HostListener } from '@angular/core';
import { votersInterface } from 'src/app/voters-interface';

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
    this.pollObj.getPollsFromService().subscribe((p) => {
      this.pollVariable = p;
    });

    this.userCredObj
      .getUserFromService()
      .subscribe((u) => (this.userVarMod = u));
  }

  pollWidth() {
    let safeVoteCon: any = document.querySelectorAll('.safe');
    for (let i = 0; i < this.pollVariable.length; i++) {
      safeVoteCon[i].style.width = '70%';
      safeVoteCon[i].style.backgroundColor = 'red';
    }
  }

  votersVariable: votersInterface[] = [];
  theVoter: votersInterface;
  safeIncrement: any;
  // MY OLD ALGO FOR POLL -------------- start ---------------------------------------------------
  safeVote(poll: pollInterface) {
    let profEmailVar: HTMLParagraphElement =
      document.querySelector('#profileEmail'); //this is from profile component

    let vote = 'SAFE';

    this.pollObj.getVotersFromService().subscribe((u) => {
      this.theVoter = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === vote
        );
      });
      if (this.theVoter) {
        //already voted

        //update the vote (minus 1 on safe vote)
        this.safeIncrement = `${(poll.pollSafeVote -= 1)}%`;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();
        //update the vote to null
        this.theVoter.votersVote = '';
        this.pollObj.updateVoteFromService(this.theVoter).subscribe();
      } else {
        //add vote (id d pa nakakavote)
        //if the voter is not on database tjen add the voters email and vote to database
        const newVoters: votersInterface = {
          votersEmail: profEmailVar.textContent,
          votersVote: 'SAFE', //because it's a safe function lol
        };
        this.pollObj
          .addVotersFromService(newVoters)
          .subscribe((v) => this.votersVariable.push(newVoters));

        //Update the SAFE vote (plus 1 to the safe vote)
        this.safeIncrement = `${(poll.pollSafeVote += 1)}%`;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //removed your NOT SAFE VOTE if you wish to vote the SAFE VOTE
        let nvote = 'NOT-SAFE';
        this.pollObj.getVotersFromService().subscribe((u) => {
          this.theVoter = u.find((v: any) => {
            return (
              v.votersEmail === profEmailVar.textContent &&
              v.votersVote === nvote
            );
          });
          if (this.theVoter) {
            //update the vote (minus 1 on safe vote)
            this.safeIncrement = `${(poll.pollNotSafeVote -= 1)}%`;
            poll.pollTotalVoters = this.userVarMod.length;
            poll.pollNoVote =
              poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
            this.pollObj.goVotePollFromService(poll).subscribe();
            //update the vote to null
            this.theVoter.votersVote = '';
            this.pollObj.updateVoteFromService(this.theVoter).subscribe();
          }
        });
      }
    });
  }

  notSafeVote(poll: pollInterface) {
    let profEmailVar: HTMLParagraphElement =
      document.querySelector('#profileEmail'); //this is from profile component

    let nsvote = 'NOT-SAFE';

    this.pollObj.getVotersFromService().subscribe((u) => {
      this.theVoter = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === nsvote
        );
      });
      if (this.theVoter) {
        //already voted
        // alert('You already voted as NOT SAFE, Strictly No double vote allowed');
        //update the vote (minus 1 on not safe vote)
        let notSafeIncrement = `${(poll.pollNotSafeVote -= 1)}%`;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();
        //update the vote to null
        this.theVoter.votersVote = '';
        this.pollObj.updateVoteFromService(this.theVoter).subscribe();
      } else {
        //add vote
        //if the voter is not on database tjen add the voters email and vote to database
        const newVoters: votersInterface = {
          votersEmail: profEmailVar.textContent,
          votersVote: 'NOT-SAFE', //because it's a not safe function lol
        };
        this.pollObj
          .addVotersFromService(newVoters)
          .subscribe((v) => this.votersVariable.push(newVoters));

        //Update the NOT SAFE vote (plus 1 to the not safe vote)
        let notSafeIncrement = `${(poll.pollNotSafeVote += 1)}%`;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //removed your SAFE VOTE if you wish to vote the NOT SAFE VOTE
        let svote = 'SAFE';
        this.pollObj.getVotersFromService().subscribe((u) => {
          this.theVoter = u.find((v: any) => {
            return (
              v.votersEmail === profEmailVar.textContent &&
              v.votersVote === svote
            );
          });
          if (this.theVoter) {
            //update the vote (minus 1 on safe vote)
            this.safeIncrement = `${(poll.pollSafeVote -= 1)}%`;
            poll.pollTotalVoters = this.userVarMod.length;
            poll.pollNoVote =
              poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
            this.pollObj.goVotePollFromService(poll).subscribe();
            //update the vote to null
            this.theVoter.votersVote = '';
            this.pollObj.updateVoteFromService(this.theVoter).subscribe();
          }
        });
      }
    });
  }
  // MY OLD ALGO FOR POLL -------------- end
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //TRYING MY NEW ALGO FOR POLL (START) safeVote2() & notSafeVote2()
  //-----------------------------SAFE-------start---------------------------------------//
  theVoterOpt1: votersInterface;
  theVoterOpt2: votersInterface;
  safeVote2(poll: pollInterface) {
    let profEmailVar: HTMLParagraphElement =
      document.querySelector('#profileEmail'); //this is from profile component
    let svote = 'SAFE';
    let nsvote = 'NOT-SAFE';

    this.pollObj.getVotersFromService().subscribe((u) => {
      this.theVoterOpt1 = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === svote
        );
      });
      this.theVoterOpt2 = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === nsvote
        );
      });
      if (this.theVoterOpt1) {
        //already voted, SAFE is the vote

        //PUT request on poll database (bawas sa SAFE sa UI)
        poll.pollSafeVote -= 1;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //PUT request on voters database
        this.theVoterOpt1.votersVote = 'null';
        this.pollObj.updateVoteFromService(this.theVoterOpt1).subscribe();
      } else if (this.theVoterOpt2) {
        //already voted, but NOT-SAFE is the vote

        //PUT request on poll database (bawas sa NOT-SAFE, dagdag sa SAFE sa UI)
        poll.pollNotSafeVote -= 1;
        poll.pollSafeVote += 1; //kase nga safeVote() funtion to hahahahahahaha
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //PUT request on voters database
        this.theVoterOpt2.votersVote = svote;
        this.pollObj.updateVoteFromService(this.theVoterOpt2).subscribe();
      } else {
        //Edi will vote SAFE
        //POST request on voters database
        const newVoter: votersInterface = {
          votersEmail: profEmailVar.textContent,
          votersVote: 'SAFE',
        };
        this.pollObj
          .addVotersFromService(newVoter)
          .subscribe((v) => this.votersVariable.push(newVoter));

        //PUT request on poll database (dagdag sa SAFE sa UI)
        poll.pollSafeVote += 1;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();
      }
    });
  }
  //-----------------------------SAFE-------end---------------------------------------//

  //-----------------------------NOT-SAFE-------start---------------------------------------//
  notSafeVote2(poll: pollInterface) {
    let profEmailVar: HTMLParagraphElement =
      document.querySelector('#profileEmail'); //this is from profile component
    let svote = 'SAFE';
    let nsvote = 'NOT-SAFE';

    this.pollObj.getVotersFromService().subscribe((u) => {
      this.theVoterOpt1 = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === svote
        );
      });
      this.theVoterOpt2 = u.find((v: any) => {
        return (
          v.votersEmail === profEmailVar.textContent && v.votersVote === nsvote
        );
      });
      if (this.theVoterOpt2) {
        //already voted, NOT-SAFE is the vote

        //PUT request on poll database (bawas sa NOT-SAFE sa UI)
        poll.pollNotSafeVote -= 1;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //PUT request on voters database
        this.theVoterOpt2.votersVote = 'null';
        this.pollObj.updateVoteFromService(this.theVoterOpt2).subscribe();
      } else if (this.theVoterOpt1) {
        //already voted, but SAFE is the vote

        //PUT request on poll database (bawas sa SAFE, dagdag sa NOT-SAFE sa UI)
        poll.pollNotSafeVote += 1; //kase nga notSafeVote() function to hahahahahahaha
        poll.pollSafeVote -= 1;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();

        //PUT request on voters database
        this.theVoterOpt1.votersVote = nsvote;
        this.pollObj.updateVoteFromService(this.theVoterOpt1).subscribe();
      } else {
        //Edi will vote NOT-SAFE
        //POST request on voters database
        const newVoter: votersInterface = {
          votersEmail: profEmailVar.textContent,
          votersVote: 'NOT-SAFE',
        };
        this.pollObj
          .addVotersFromService(newVoter)
          .subscribe((v) => this.votersVariable.push(newVoter));

        //PUT request on poll database (dagdag sa NOT-SAFE sa UI)
        poll.pollNotSafeVote += 1;
        poll.pollTotalVoters = this.userVarMod.length;
        poll.pollNoVote =
          poll.pollTotalVoters - (poll.pollSafeVote + poll.pollNotSafeVote);
        this.pollObj.goVotePollFromService(poll).subscribe();
      }
    });
  }
  //-----------------------------NOT-SAFE-------end---------------------------------------//
  //TRYING MY NEW ALGO FOR POLL (END)
}
