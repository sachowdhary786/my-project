import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged } from 'rxjs';
import { ids } from '../../../../envs/environment';
import { PlayerTypeInterface } from '../../models/players.type';
import { PlayerDetailsInterface } from '../../models/playerDetails.type';

@Injectable({
  providedIn: 'root'
})
export class SquadDataService {
  seasonID = ids.currentSeason;

  private fetchedPlayersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public fetchedPlayers$: Observable<any[]> = this.fetchedPlayersSubject.asObservable();

  private fetchedPlayerStatsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public fetchedPlayerStats$: Observable<any[]> = this.fetchedPlayerStatsSubject.asObservable();

  constructor(private apiService: ApiService) { }

  fetchData(teamID: number, seasonID: number) {
    this.apiService.getTeamStats(teamID).subscribe((res) => {
      const players = res.data.players;
      this.fetchedPlayersSubject.next(players);
      this.fetchPlayerStats(players, seasonID);
    });
  }

  private fetchPlayerStats(players: PlayerTypeInterface[], seasonID: number) {
    const playerStatsObservables: Observable<PlayerDetailsInterface>[] = players.map(player => {
      const playerID = player.player_id!;
      return this.apiService.getPlayerStats(playerID, seasonID).pipe(
        distinctUntilChanged() 
      );
    });

    // Wait for all player stats observables to emit a value
    combineLatest(playerStatsObservables).subscribe(playerStatsArray => {
      // Filter out null values (error handling)
      const filteredStatsArray = playerStatsArray.filter(stats => stats !== null);
      this.fetchedPlayerStatsSubject.next(filteredStatsArray);
    });
  }
}
