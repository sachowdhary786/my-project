import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContentInterface } from '../../core/models/tab-content';


@Component({
  selector: 'ui-tab-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tab-item.component.html',
  styleUrl: './ui-tab-item.component.scss'
})
export class UITabItemComponent {
  @Input() tabName? = 'default';
  @Input() templateRef!: TemplateRef<any>;
  @Input() content?: TabContentInterface;
}
