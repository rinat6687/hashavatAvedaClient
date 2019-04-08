import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailCompComponent } from './mail-comp.component';

describe('MailCompComponent', () => {
  let component: MailCompComponent;
  let fixture: ComponentFixture<MailCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
