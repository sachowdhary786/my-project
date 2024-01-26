import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { ids } from '../../../../../envs/environment';

@Component({
  selector: 'app-top-scorers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-scorers.component.html',
  styleUrl: './top-scorers.component.scss'
})
export class TopScorersComponent implements OnInit {
  currentSeason!: number;
  teamId!: number;
  teamPlayers: any[] = [];
  goalScorers: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.currentSeason = ids.currentSeason;
    this.teamId = ids.arsenalId;

    this.apiService.getTeamStats(this.teamId).subscribe((res) => {
      for (var index in res.data.players) {
        this.teamPlayers.push(res.data.players[index]);
        this.apiService.getPlayerStats(res.data.players[index].player_id, this.currentSeason).subscribe((res) => {
          if (res.data.position_id != 24) {
            // Loop through the statistics to get the goals scored by each player
            if (res.data.statistics && res.data.statistics.length > 0) {
              res.data.statistics.forEach((stat: { details: any[]; }) => {
                const goals = stat.details.find((detail: { type: { code: string; }; }) => detail.type && detail.type.code === 'goals');
                if (goals) {
                  const totalGoals = goals.value.total;
                  this.goalScorers.push([res.data.display_name, totalGoals])
                }
              });
            }
          }
        })
      }
    })
    this.goalScorers.sort((a,b)=> b[1] - a[1])
  }
}

