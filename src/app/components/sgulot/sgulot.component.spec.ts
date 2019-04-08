import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgulotComponent } from './sgulot.component';

describe('SgulotComponent', () => {
  let component: SgulotComponent;
  let fixture: ComponentFixture<SgulotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgulotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgulotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
