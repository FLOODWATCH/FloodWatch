import { Component, OnInit } from '@angular/core';
import { waterLevelPostInterface } from 'src/app/WaterLevelPost-Interface';
import { monthlyInterface } from 'src/app/montly-Interface';
import { FlupdatesService } from 'src/app/dashboard-service/flupdates.service';

@Component({
  selector: 'app-monthly-diagram',
  templateUrl: './monthly-diagram.component.html',
  styleUrls: ['./monthly-diagram.component.css'],
})
export class MonthlyDiagramComponent implements OnInit {
  flUpdatesVariable: waterLevelPostInterface[] = [];
  constructor(private flUpdatesServiceObj: FlupdatesService) {}

  ngOnInit(): void {
    this.flUpdatesServiceObj
      .getFLUpdatesFromService()
      .subscribe((f) => (this.flUpdatesVariable = f));
  }
}
