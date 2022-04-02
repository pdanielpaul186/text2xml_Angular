import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Text files converted', cols: 1, rows: 1 },
          { title: 'Number of Templates', cols: 1, rows: 1 },
          { title: 'Types of files downloaded', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Text files converted', cols: 2, rows: 1 },
        { title: 'Number of Templates', cols: 1, rows: 1 },
        { title: 'Types of files downloaded', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  


}
