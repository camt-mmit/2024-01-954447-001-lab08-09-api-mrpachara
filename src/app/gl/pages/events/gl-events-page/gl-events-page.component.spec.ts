import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlEventsPageComponent } from './gl-events-page.component';

describe('GlEventsPageComponent', () => {
  let component: GlEventsPageComponent;
  let fixture: ComponentFixture<GlEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlEventsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
