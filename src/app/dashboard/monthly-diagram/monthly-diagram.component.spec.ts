import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDiagramComponent } from './monthly-diagram.component';

describe('MonthlyDiagramComponent', () => {
  let component: MonthlyDiagramComponent;
  let fixture: ComponentFixture<MonthlyDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
