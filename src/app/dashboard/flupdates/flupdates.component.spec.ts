import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlupdatesComponent } from './flupdates.component';

describe('FlupdatesComponent', () => {
  let component: FlupdatesComponent;
  let fixture: ComponentFixture<FlupdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlupdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
