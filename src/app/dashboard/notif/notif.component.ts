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
}
