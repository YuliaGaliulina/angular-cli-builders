import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOfOptionComponent } from './one-of-option.component';

describe('SchemaOptionComponent', () => {
  let component: OneOfOptionComponent;
  let fixture: ComponentFixture<OneOfOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneOfOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneOfOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
