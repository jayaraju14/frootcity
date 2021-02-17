import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuCategoriesComponent } from './main-menu-categories.component';

describe('MainMenuCategoriesComponent', () => {
  let component: MainMenuCategoriesComponent;
  let fixture: ComponentFixture<MainMenuCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
