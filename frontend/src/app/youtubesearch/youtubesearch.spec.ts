import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Youtubesearch } from './youtubesearch';

describe('Youtubesearch', () => {
  let component: Youtubesearch;
  let fixture: ComponentFixture<Youtubesearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Youtubesearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Youtubesearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
