import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, partition } from 'rxjs';
import { environment } from '../../../../envs/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = environment.apiUrl;
  public apiKey = '?api_token=' + environment.apiKey;
  public coreUrl = environment.coreUrl;

  // Cache for getPlayerStats function
  private playerStatsCache: { [key: string]: BehaviorSubject<any> } = {};

  constructor(public http: HttpClient) { }

  /* Get Stats Functions  */
  // getSeasonData(id?: number) {
  //   this.http.get<any>(this.apiUrl + `seasons/${id}` + this.apiKey).subscribe(data => {
  //     this.dataSubject.next(data);
  //   })
  // }

  // getSeasonStatistics(participant: number, id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}statistics/seasons/${participant}/${id}${this.apiKey}`)
  // }

  private getDataSubject(key: string): BehaviorSubject<any> {
    // console.log('checking data subject');
    if (!this.playerStatsCache[key]) {
      // console.log('playerstatscache[key] does not exist')
      this.playerStatsCache[key] = new BehaviorSubject<any>(null);
      // console.log(this.playerStatsCache[key])
    }
    return this.playerStatsCache[key]
  }

  clearPlayerStatsCache(participant: number): void {
    const cacheKey = `playerStats-${participant}`;
    delete this.playerStatsCache[cacheKey];
  }

  clearAllPlayerStatsCache(): void {
    this.playerStatsCache = {};
  }

  getPlayerStats(participant: number, season: number): Observable<any> {
    const cacheKey = `playerStats-${participant}`;
    const dataSubject = this.getDataSubject(cacheKey);

    if (dataSubject.value) {
      return dataSubject.asObservable();
    }

    this.http.get<any>(`${this.apiUrl}players/${participant}${this.apiKey}&include=statistics.details.type&filters=playerStatisticSeasons:${season}`).subscribe(data => {
      // console.log('Fetched Data from API:', data);
      // console.log('Data Source: API ')
      dataSubject.next(data);
    }, error => {
      // console.error('Error fetching data from API: ', error)
      delete this.playerStatsCache[cacheKey];
    })
    return dataSubject.asObservable();
  }

  getTeamStats(team: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}teams/${team}${this.apiKey}&include=players;coaches`)
  }

  getCoach(coach_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}coaches/${coach_id}${this.apiKey}&include=nationality`)
  }

  getTopScorers(season_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}topscorers/seasons/${season_id}${this.apiKey}`)
  }
  /* End Stats Function */

  /* Get Schedule Data */
  getTeamSchedule(team_id: number, season_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}schedules/seasons/${season_id}/teams/${team_id}${this.apiKey}`)
  }

  getFixtureDetails(fixture_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}fixtures/${fixture_id}${this.apiKey}&include=scores`)
  }
  /* End Schedule Data */

  /* Get Live Data */
  getLiveScores(): Observable<any> {
    return this.http.get(`${this.apiUrl}livescores/inplay${this.apiKey}`)
  }

  getLiveTable(league_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}standings/live/leagues/${league_id}${this.apiKey}`)
  }
  /* End Live Data */

  /* Other Calls */
  getCountryData(country_id: number): Observable<any> {
    return this.http.get<any>(`${this.coreUrl}countries/${country_id}${this.apiKey}`)
  }
  /* End Other Calls */

}