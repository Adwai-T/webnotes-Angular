import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitemComponent } from './invitem.component';

describe('InvitemComponent', () => {
  let component: InvitemComponent;
  let fixture: ComponentFixture<InvitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
