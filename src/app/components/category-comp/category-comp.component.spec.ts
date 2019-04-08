import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCompComponent } from './category-comp.component';

describe('CategoryCompComponent', () => {
  let component: CategoryCompComponent;
  let fixture: ComponentFixture<CategoryCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
