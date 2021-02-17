import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvacadoStoneFruitsComponent } from './avacado-stone-fruits.component';

describe('AvacadoStoneFruitsComponent', () => {
  let component: AvacadoStoneFruitsComponent;
  let fixture: ComponentFixture<AvacadoStoneFruitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvacadoStoneFruitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvacadoStoneFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
