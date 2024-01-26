import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UITabItemComponent } from '../ui-tab-item/ui-tab-item.component';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule, UITabItemComponent],
  templateUrl: './ui-tabs.component.html',
  styleUrls: ['./ui-tabs.component.scss']
})
export class UITabsComponent {
  @ContentChildren(UITabItemComponent) tabs!: QueryList<UITabItemComponent>;
  activeComponent!: UITabItemComponent;

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
  }

  activateTab(tab: UITabItemComponent) {
    this.activeComponent = tab;
  }
}
