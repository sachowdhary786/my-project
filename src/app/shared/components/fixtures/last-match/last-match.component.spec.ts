import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMatchComponent } from './last-match.component';

describe('LastMatchComponent', () => {
  let component: LastMatchComponent;
  let fixture: ComponentFixture<LastMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
