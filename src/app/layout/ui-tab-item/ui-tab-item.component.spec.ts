import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UITabItemComponent } from './ui-tab-item.component';

describe('TabsItemComponent', () => {
  let component: UITabItemComponent;
  let fixture: ComponentFixture<UITabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITabItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UITabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
