import { NgModule } from "@angular/core";
import { LeagueTableComponent } from "../../shared/components/fixtures/league-table/league-table.component";
import { HomepageComponent } from "./homepage.component";
import { CommonModule } from "@angular/common";
import { NextMatchComponent } from "../../shared/components/fixtures/next-match/next-match.component";
import { TopScorersComponent } from "../../shared/components/cards/top-scorers/top-scorers.component";

@NgModule({
    imports: [CommonModule],
    declarations: [LeagueTableComponent, NextMatchComponent, TopScorersComponent],
    exports: [HomepageComponent]
})

export class HomepageModule { }