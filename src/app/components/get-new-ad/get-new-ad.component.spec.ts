import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNewAdComponent } from './get-new-ad.component';

describe('GetNewAdComponent', () => {
  let component: GetNewAdComponent;
  let fixture: ComponentFixture<GetNewAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNewAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
