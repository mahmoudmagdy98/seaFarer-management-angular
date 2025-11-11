import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeafarerListComponent } from './seafarer-list.component';

describe('SeafarerListComponent', () => {
  let component: SeafarerListComponent;
  let fixture: ComponentFixture<SeafarerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeafarerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeafarerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
