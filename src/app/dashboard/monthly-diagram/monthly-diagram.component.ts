import { Component, OnInit } from '@angular/core';
import { waterLevelPostInterface } from 'src/app/WaterLevelPost-Interface';
import { monthlyInterface } from 'src/app/montly-Interface';
import { FlupdatesService } from 'src/app/dashboard-service/flupdates.service';
import { FlmonthlyService } from 'src/app/dashboard-service/flmonthly.service';

@Component({
  selector: 'app-monthly-diagram',
  templateUrl: './monthly-diagram.component.html',
  styleUrls: ['./monthly-diagram.component.css'],
})
export class MonthlyDiagramComponent implements OnInit {
  flUpdatesVariable: waterLevelPostInterface[] = [];
  diagram: monthlyInterface[] = [];
  waterLevel: waterLevelPostInterface;
  waterLevelJan: waterLevelPostInterface;
  waterLevelFeb: waterLevelPostInterface;
  waterLevelMar: waterLevelPostInterface;
  waterLevelApr: waterLevelPostInterface;
  waterLevelMay: waterLevelPostInterface;
  waterLevelJun: waterLevelPostInterface;
  waterLevelJul: waterLevelPostInterface;
  waterLevelAug: waterLevelPostInterface;
  waterLevelSep: waterLevelPostInterface;
  waterLevelOct: waterLevelPostInterface;
  waterLevelNov: waterLevelPostInterface;
  waterLevelDec: waterLevelPostInterface;

  constructor(
    private flUpdatesServiceObj: FlupdatesService,
    private FlmonthlyServiceObj: FlmonthlyService
  ) {}

  ngOnInit(): void {
    //GET the monthly diagram to be displayed according to months label
    // this.FlmonthlyServiceObj.getDiagramFromService().subscribe(
    //   (diagram) => (this.diagram = diagram)
    // );

    //GET the water level post to be inserted in each diagram depending on month
    // this.flUpdatesServiceObj
    //   .getFLUpdatesFromService()
    //   .subscribe((f) => (this.flUpdatesVariable = f));

    //logic for displaying the water level post into its designated diagram container
    this.flUpdatesServiceObj.getFLUpdatesFromService().subscribe((u) => {
      this.waterLevelJan = u.find((a: any) => {
        return a.wlMonth === 'January';
      });
      this.waterLevelFeb = u.find((a: any) => {
        return a.wlMonth === 'Febuary';
      });
      this.waterLevelMar = u.find((a: any) => {
        return a.wlMonth === 'March';
      });
      this.waterLevelApr = u.find((a: any) => {
        return a.wlMonth === 'April';
      });
      this.waterLevelMay = u.find((a: any) => {
        return a.wlMonth === 'May';
      });
      this.waterLevelJun = u.find((a: any) => {
        return a.wlMonth === 'June';
      });
      this.waterLevelJul = u.find((a: any) => {
        return a.wlMonth === 'July';
      });
      this.waterLevelAug = u.find((a: any) => {
        return a.wlMonth === 'August';
      });
      this.waterLevelSep = u.find((a: any) => {
        return a.wlMonth === 'September';
      });
      this.waterLevelOct = u.find((a: any) => {
        return a.wlMonth === 'October';
      });
      this.waterLevelNov = u.find((a: any) => {
        return a.wlMonth === 'November';
      });
      this.waterLevelDec = u.find((a: any) => {
        return a.wlMonth === 'December';
      });
      if (this.waterLevelMay) {
        this.FlmonthlyServiceObj.getDiagramFromService().subscribe((d) => {
          this.diagram = d;
          this.diagram = this.diagram.filter(
            (showOnlyThisMonthDiagram) =>
              showOnlyThisMonthDiagram.month === 'May' ||
              showOnlyThisMonthDiagram.month === 'April'
          );
        });
        this.flUpdatesServiceObj.getFLUpdatesFromService().subscribe((f) => {
          this.flUpdatesVariable = f;
          this.flUpdatesVariable = this.flUpdatesVariable.filter(
            (showOnlyThisMonthHehe) => showOnlyThisMonthHehe.wlMonth === 'May' //it will filter all the water level post in other month except in month of May hehe
          );
        });
      }
      // if (this.waterLevelApr) {
      //   this.FlmonthlyServiceObj.getDiagramFromService().subscribe((d) => {
      //     this.diagram = d;
      //     // this.diagram = this.diagram.filter(
      //     //   (showOnlyThisMonthDiagram) =>
      //     //     showOnlyThisMonthDiagram.month === 'April'
      //     // );
      //   });
      //   this.flUpdatesServiceObj.getFLUpdatesFromService().subscribe((f) => {
      //     this.flUpdatesVariable = f;
      //     this.flUpdatesVariable = this.flUpdatesVariable.filter(
      //       (showOnlyThisMonthHehe) => showOnlyThisMonthHehe.wlMonth === 'April' //it will filter all the water level post in other month except in month of May hehe
      //     );
      //   });
      // }
    });
  }
}

// this.flUpdatesServiceObj.getFLUpdatesFromService().subscribe((z) => {
//   this.waterLevel = z.find((fl: any) => {
//     return fl.wlMonth === 'May';
//   });
//   if (this.waterLevel) {
//     console.log(this.waterLevel);
//     console.log('===========================================');
//   }
// });
