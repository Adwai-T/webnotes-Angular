import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeitemsComponent } from './tradeitems.component';

describe('TradeitemsComponent', () => {
  let component: TradeitemsComponent;
  let fixture: ComponentFixture<TradeitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
