import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UITabsComponent } from './ui-tabs.component';

describe('TabsComponent', () => {
  let component: UITabsComponent;
  let fixture: ComponentFixture<UITabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UITabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
