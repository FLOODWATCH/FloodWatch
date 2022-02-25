import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDashComponent } from './register-dash.component';

describe('RegisterDashComponent', () => {
  let component: RegisterDashComponent;
  let fixture: ComponentFixture<RegisterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
