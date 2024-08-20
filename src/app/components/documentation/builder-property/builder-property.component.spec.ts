import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderPropertyComponent } from './builder-property.component';

describe('SchemaItemComponent', () => {
  let component: BuilderPropertyComponent;
  let fixture: ComponentFixture<BuilderPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
