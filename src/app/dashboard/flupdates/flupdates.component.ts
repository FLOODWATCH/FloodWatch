import { Component, OnInit } from '@angular/core';
import { waterLevelPostInterface } from 'src/app/WaterLevelPost-Interface';
import { FlupdatesService } from 'src/app/dashboard-service/flupdates.service';

@Component({
  selector: 'app-flupdates',
  templateUrl: './flupdates.component.html',
  styleUrls: ['./flupdates.component.css'],
})
export class FlupdatesComponent implements OnInit {
  flUpdatesVariable: waterLevelPostInterface[] = [];
  constructor(private flUpdateServiceObj: FlupdatesService) {}

  ngOnInit(): void {
    this.flUpdateServiceObj
      .getFLUpdatesFromService()
      .subscribe((flupdates) => (this.flUpdatesVariable = flupdates));
  }
}
