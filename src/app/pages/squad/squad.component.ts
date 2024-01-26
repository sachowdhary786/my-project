import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ids } from '../../../envs/environment';
import { SquadDataService } from '../../core/services/squad-data/squad-data.service';
import { PlayerDetailsInterface } from '../../core/models/playerDetails.type';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { PlayerCardComponent } from '../../shared/components/cards/player-cards/player-cards.component';
import { PlayerCardModule } from '../../shared/components/cards/player-cards/player-cards.module';
import { ApiService } from '../../core/services/api/api.service';


@Component({
  selector: 'app-squad',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, PlayerCardModule],
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {
  currentSeason!: number;
  teamId!: number;
  teamDetails$!: Observable<PlayerDetailsInterface[]>;
  players: any[] = [];
  playerDetails: any[] = [];
  countryData: any[] = [];

  constructor(private squadDataService: SquadDataService, private apiService: ApiService) { }

  private fetchedCountrySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public fetchedCountries$: Observable<any[]> = this.fetchedCountrySubject.asObservable();

  ngOnInit(): void {
    this.currentSeason = ids.currentSeason;
    this.teamId = ids.arsenalId;

    this.teamDetails$ = this.squadDataService.fetchedPlayers$;

    this.squadDataService.fetchData(this.teamId, this.currentSeason);

    this.teamDetails$.subscribe(players => {
      this.players = players;
    });

    this.squadDataService.fetchedPlayerStats$.subscribe(playerDetails => {
      this.playerDetails = playerDetails;
      for (var index in this.playerDetails){
        this.apiService.getCountryData(playerDetails[index]?.data?.country_id).subscribe((res) => {
          this.countryData = res;
          this.fetchedCountrySubject.next(this.countryData);
          distinctUntilChanged();
        })
      }
    });

  }
}