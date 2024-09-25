import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIntroductionComponent } from './docs-introduction.component';

describe('GuideComponent', () => {
  let component: DocsIntroductionComponent;
  let fixture: ComponentFixture<DocsIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
