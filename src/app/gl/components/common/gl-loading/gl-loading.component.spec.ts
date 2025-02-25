import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlLoadingComponent } from './gl-loading.component';

describe('GlLoadingComponent', () => {
  let component: GlLoadingComponent;
  let fixture: ComponentFixture<GlLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
