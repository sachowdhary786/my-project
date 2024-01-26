import { Component, OnInit } from '@angular/core';
import { LeagueTableComponent } from '../../shared/components/fixtures/league-table/league-table.component';
import { NextMatchComponent } from '../../shared/components/fixtures/next-match/next-match.component';
import { TopScorersComponent } from '../../shared/components/cards/top-scorers/top-scorers.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [LeagueTableComponent, NextMatchComponent, TopScorersComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
