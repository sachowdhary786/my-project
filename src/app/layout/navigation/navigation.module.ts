import { NgModule } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import { HeaderModule } from "../header/header.module";
import { AppRoutingModule } from "../../app.routes";

@NgModule({
    imports: [HeaderModule, AppRoutingModule],
    declarations: [NavigationComponent],
    exports: [NavigationComponent]
})

export class NavigationModule { }