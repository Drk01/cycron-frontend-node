import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBrainComponent } from './the-brain.component';

describe('TheBrainComponent', () => {
  let component: TheBrainComponent;
  let fixture: ComponentFixture<TheBrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheBrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheBrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
