import { Input, NgModule } from "@angular/core";

@NgModule({
    imports: [],
    declarations: [],
    exports: []
})

export class PlayerCardModule {
    @Input() players:  any;
    @Input() playerDetails: any;
}