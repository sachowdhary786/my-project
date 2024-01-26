import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { FixtureType } from '../../../../core/models/fixture.type';
import { ids } from '../../../../../envs/environment';

@Component({
  selector: 'app-next-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-match.component.html',
  styleUrl: './next-match.component.scss'
})
export class NextMatchComponent implements OnInit {
  fixtures: any[] = [];
  prevFive: any[] = [];
  prevFiveFinal: any[] = [];
  currentFixture!: FixtureType;
  nextFixture!: any;
  hour: number | undefined;
  minutes: number | undefined;
  month: string | undefined;
  day: number | undefined;
  currentSeason!: number;
  arsenalId: number | undefined;
  scoreObject!: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.currentSeason = ids.currentSeason;
    this.arsenalId = ids.arsenalId;

    this.apiService.getTeamSchedule(this.arsenalId, this.currentSeason).subscribe(
      (res) => {
        this.fixtures = res.data[0].rounds;

        // Call the sortFixtures function to sort the fixtures
        this.sortFixtures();

        // Find the current fixture
        for (var index in this.fixtures) {
          if (this.fixtures[index].games_in_current_week) {
            this.currentFixture = this.fixtures[index];

            // Find the index of currentFixture
            const currentIndex = this.fixtures.indexOf(this.currentFixture);

            // Calculate the next index
            const nextIndex = currentIndex + 1;

            // Ensure nextIndex is within bounds
            if (nextIndex < this.fixtures.length) {
              this.nextFixture = this.fixtures[nextIndex];
            } else {
              return
            }

            // Calculate the starting index for the previous 5 fixtures
            const startIndex = Math.max(0, currentIndex - 5);

            // Iterate backward through the array to get the previous 5 fixtures
            for (let i = currentIndex - 1; i >= startIndex; i--) {
              if (i >= 0) {
                this.prevFive.push(this.fixtures[i]);
              } else {
                break; // Break the loop if we reach the beginning of the array
              }
            }
          }
        }
        this.nextFixture = this.nextFixture.fixtures[0];
        this.convertTime(this.nextFixture.starting_at_timestamp)

        // Get Fixture details for the previous 5 fixtures 
        // Could put this in it's own module? 
        for (var index in this.prevFive) {
          // Define a root for DRY principle
          const root = this.prevFive[index].fixtures[0]

          var home_logo = root.participants[0].image_path;
          var away_logo = root.participants[1].image_path;
          
          var home_goals = root.scores[4].score.goals
          var away_goals = root.scores[5].score.goals

          var result = root.result_info

          // Define the object and pass through the properties from above
          this.scoreObject = {
            homeLogo: home_logo,
            homeGoals: home_goals,
            awayLogo: away_logo,
            awayGoals: away_goals,
            result: result
          }

          // Push each object into the final array to print on screen
          this.prevFiveFinal.push(this.scoreObject);
        }
      }
    );
  }

  convertTime(time: number): void {
    var date = new Date(time * 1000);
    const month = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]

    this.hour = date.getHours();
    this.minutes = date.getMinutes();
    this.month = month[date.getMonth() + 1]
    this.day = date.getDate()
  }

  sortFixtures(): void {
    // Convert object values to an array
    this.fixtures.forEach(fixture => {
      fixture.name = parseInt(fixture.name);
    });

    // Sort the fixtures based on the "name" property in numerical order
    this.fixtures.sort((a, b) => {
      return a.name - b.name;
    });
  }
}
