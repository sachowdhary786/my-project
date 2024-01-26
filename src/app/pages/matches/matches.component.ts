import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { ids } from '../../../envs/environment';
import { FixtureType } from '../../core/models/fixture.type';
import { UITabsComponent } from '../../layout/ui-tabs/ui-tabs.component';
import { UITabItemComponent } from '../../layout/ui-tab-item/ui-tab-item.component';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, UITabsComponent, UITabItemComponent],
  providers: [DatePipe],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent implements OnInit {
  constructor(private apiService: ApiService, private datePipe: DatePipe) { }

  tab1 = 'Results';
  tab2 = 'Fixtures';

  currentSeason!: number;
  teamId!: number;
  fixtures: any[] = [];

  fixtureCards: any[] = [];
  currentFixture!: FixtureType;
  results: any[] = [];

  scoreObject!: any;

  hour?: number;
  minutes?: number;
  month?: string;
  day?: number;

  $any: any;

  ngOnInit(): void {
    this.currentSeason = ids.currentSeason;
    this.teamId = ids.arsenalId;

    this.apiService.getTeamSchedule(this.teamId, this.currentSeason).subscribe((res) => {
      this.fixtures = res.data[0].rounds;

      // Call the sortFixtures function to sort the fixtures
      this.sortFixtures();

      // Find the current fixture
      for (var index in this.fixtures) {
        if (this.fixtures[index].games_in_current_week) {
          this.currentFixture = this.fixtures[index];

          // Find the index of currentFixture
          const currentIndex = this.fixtures.indexOf(this.currentFixture);

          // Using recursion we can find the previous fixtures
          this.findPreviousResults(currentIndex);
        }
        if (this.fixtures[index].fixtures[0].scores.length !== 6) {
          this.fixtureCards.push(this.fixtures[index].fixtures[0])
        }
      }
      this.reverseSortFixtures();
    })
  }

  findPreviousResults(currentIndex: number): void {
    const root = this.fixtures[currentIndex].fixtures[0]
    console.log(root);

    var home_logo; var away_logo; var home_goals; var away_goals;
    var date; var result;

    const filteredObjects = root.scores.filter((item: { type_id: number; }) => item.type_id === 2);

    for (const item of filteredObjects) {
      if (item.score.participant === 'away') {
        away_goals = item.score.goals;
      } else {
        home_goals = item.score.goals
      }
    }

    if (root.participants[0].meta.location === 'home') {
      home_logo = root.participants[0].image_path;
    } else {
      home_logo = root.participants[1].image_path;
    }
    if (root.participants[0].meta.location === 'away') {
      away_logo = root.participants[0].image_path;
    } else {
      away_logo = root.participants[1].image_path
      away_goals = root.scores[5].score.goals
    }

    date = this.convertTime(root.starting_at_timestamp)

    result = root.result_info

    // Define the object and pass through the properties from above
    this.scoreObject = {
      homeLogo: home_logo,
      homeGoals: home_goals,
      awayLogo: away_logo,
      awayGoals: away_goals,
      date: date,
      result: result
    }

    if (currentIndex >= 0) {
      this.results.push(this.scoreObject);
      if (currentIndex !== 0) {
        this.findPreviousResults(currentIndex - 1);
      }
    }
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
    this.fixtures.forEach(fixture => {
      fixture.name = parseInt(fixture.name);
    })
    this.fixtures.sort((a, b) => {
      return a.name - b.name;
    })
  }

  reverseSortFixtures(): void {
    this.fixtures.sort((a, b) => {
      return b.name - a.name;
    })
  }
}
