import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToDocsButtonComponent } from './go-to-docs-button.component';

describe('GoToDocsButtonComponent', () => {
  let component: GoToDocsButtonComponent;
  let fixture: ComponentFixture<GoToDocsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToDocsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToDocsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
