import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskRabbiComponent } from './ask-rabbi.component';

describe('AskRabbiComponent', () => {
  let component: AskRabbiComponent;
  let fixture: ComponentFixture<AskRabbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskRabbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskRabbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
