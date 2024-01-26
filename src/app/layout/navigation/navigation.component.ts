import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AppRoutingModule } from '../../app.routes';
import { slideInAnimation } from '../../core/animations/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [HeaderComponent, AppRoutingModule],
  animations: [slideInAnimation],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private contexts: ChildrenOutletContexts) { }

  /* 
    Takes the value of the outlet and returns a string that 
    respresentsthe state of the animation based on the custom
    data of the current active route.
    This is used to control with transition is run for each route
  */
  getRouteAnimationData() {
    const routeData = this.contexts.getContext('primary')?.route?.snapshot?.data;
    return routeData?.['animation'];
  }
}
