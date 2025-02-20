import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwLoadingComponent } from './sw-loading.component';

describe('SwLoadingComponent', () => {
  let component: SwLoadingComponent;
  let fixture: ComponentFixture<SwLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
