import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitrusComponent } from './citrus.component';

describe('CitrusComponent', () => {
  let component: CitrusComponent;
  let fixture: ComponentFixture<CitrusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitrusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
