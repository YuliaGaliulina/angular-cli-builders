import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsMenuComponent } from './versions-menu.component';

describe('VersionsMenuComponent', () => {
  let component: VersionsMenuComponent;
  let fixture: ComponentFixture<VersionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
