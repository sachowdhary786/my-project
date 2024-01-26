import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-league-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'] // Fix typo in styleUrls
})

export class LeagueTableComponent implements OnInit {
  loading = true;
  items: any;
  teams: any[] = [];
  extractedData: { name: string, image_path: string }[] = [];
  mergedArray: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLiveTable(8).subscribe(
      async (res) => {
        this.items = res.data;

        await this.loopNestedLeagueObject(this.items);

        for (const key in this.teams) {
          if (this.teams.hasOwnProperty(key) && this.teams[key].data) {
            const { name, image_path } = this.teams[key].data;
            this.extractedData.push({ name, image_path });
          }
        }
        if (this.teams.length === this.extractedData.length) {
          // Combine corresponding objects at each index
          this.mergedArray = this.teams.map((team, index) => ({
            ...this.items[index],
            ...this.extractedData[index]
          }));
        }
      }, (error) => {
        console.error('Error fetching data: ', error);
        this.loading = false;
      }
    )
  }

  getTeamsById(team_id: number): Observable<any> {
    return this.apiService.http.get<any>(`${this.apiService.apiUrl}teams/${team_id}${this.apiService.apiKey}`);
  }

  async loopNestedLeagueObject(obj: any, depth: number = 0) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
          // If the value is an object and not null, recursively call the function
          this.loopNestedLeagueObject(value, depth + 1);
        } else {
          // Check if the key is 'team_id' and fetch teams
          if (key === 'participant_id') {
            await this.getTeamsById(value).subscribe(
              (teamResponse) => {
                this.teams.push(teamResponse);
              },
              (teamError) => {
                console.error(`Error fetching teams for team_id ${value}:`, teamError);
              }
            );
          }
        }
      }
    }
  }
}
