import { NgModule } from "@angular/core";
import { SquadComponent } from "./squad.component";
import { PlayerCardComponent } from "../../shared/components/cards/player-cards/player-cards.component";

@NgModule({
    imports: [PlayerCardComponent],
    declarations: [SquadComponent, PlayerCardComponent],
    exports: []
})

export class SquadModule {}