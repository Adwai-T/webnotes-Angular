import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTilesComponent } from './notes-tiles.component';

describe('NotesTilesComponent', () => {
  let component: NotesTilesComponent;
  let fixture: ComponentFixture<NotesTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
