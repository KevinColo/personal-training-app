import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
} from '@angular/router';
import { map } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public url: any;
  public breadcrumbs;
  public title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => {
          if (event instanceof NavigationEnd) {
            this.url = event.url;
          }
          return event instanceof NavigationEnd;
        })
      )
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(event => {
        const title = event.snapshot.data['title'];
        const parent = event.parent?.snapshot.data['breadcrumb'];
        const child = event.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          parentBreadcrumb: parent,
          childBreadcrumb: child,
        };
      });
  }

  ngOnInit() {}
}
