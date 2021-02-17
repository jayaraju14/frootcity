import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleAndPearsComponent } from './apple-and-pears.component';

describe('AppleAndPearsComponent', () => {
  let component: AppleAndPearsComponent;
  let fixture: ComponentFixture<AppleAndPearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppleAndPearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleAndPearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
