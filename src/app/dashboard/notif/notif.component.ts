import { Component, OnInit } from '@angular/core';
import { waterLevelPostInterface } from 'src/app/WaterLevelPost-Interface';
import { FlupdatesService } from 'src/app/dashboard-service/flupdates.service';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css'],
})
export class NotifComponent implements OnInit {
  notifVar: waterLevelPostInterface[] = [];

  constructor(private flUpdateServiceObj: FlupdatesService) {}

  ngOnInit(): void {
    this.flUpdateServiceObj
      .getFLUpdatesFromService()
      .subscribe((notif) => (this.notifVar = notif));
  }

  toggleFlUpdatesCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'block';
    ////////////////////////
    let postTabBottomLine: HTMLHeadingElement =
      document.querySelector('.post-tab');
    postTabBottomLine.style.borderBottom = '5px solid transparent';

    let pollTabBottomLine: HTMLHeadingElement =
      document.querySelector('.poll-tab');
    pollTabBottomLine.style.borderBottom = '5px solid transparent';

    let diagramTabBottomLine: HTMLHeadingElement =
      document.querySelector('.diagram-tab');
    diagramTabBottomLine.style.borderBottom = '5px solid transparent';

    let flupdatesTabBottomLine: HTMLDivElement =
      document.querySelector('.flupdates-tab');
    flupdatesTabBottomLine.style.borderBottom = '5px solid #2e89ff';
  }
}
