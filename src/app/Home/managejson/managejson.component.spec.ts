import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejsonComponent } from './managejson.component';

describe('ManagejsonComponent', () => {
  let component: ManagejsonComponent;
  let fixture: ComponentFixture<ManagejsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagejsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
