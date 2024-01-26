import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-player-card',
  templateUrl: './player-cards.component.html',
  styleUrls: ['./player-cards.component.scss']
})
export class PlayerCardComponent {
  @Input() players: any;
  @Input() playerDetails: any;
  @Input() countryData: any;
  @Input() index: any;
}
