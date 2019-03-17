import { Injectable } from '@angular/core';
import { NavigationElement } from '../models/navigation-element';
import { NavigationElementType } from '../models/navigation-element-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private readonly Home: NavigationElement = {
    text: 'Home',
    type: 'HOME',
    enabled: false,
    hidden: true,
    order: 0,
  };

  private readonly Users: NavigationElement = {
    text: 'Users',
    type: 'USERS',
    enabled: true,
    hidden: false,
    order: 1,
  };

  private readonly Cats: NavigationElement = {
    text: 'Cats',
    type: 'CATS',
    enabled: true,
    hidden: false,
    order: 2,
  };

  private readonly Dogs: NavigationElement = {
    text: 'Dogs',
    type: 'DOGS',
    enabled: true,
    hidden: false,
    order: 3,
  };

  private readonly Planets: NavigationElement = {
    text: 'Planets',
    type: 'PLANETS',
    enabled: false,
    hidden: false,
    order: 4,
  };

  private readonly NavigationElementsPerRole = {
    moped_admin: [
      this.Home,
      this.Users,
      this.Cats,
      this.Dogs,
      this.Planets,
    ],
    moped_user: [
      this.Home,
      this.Users,
      this.Planets,
    ]
  };

  private readonly RoutesPerNavigationElementType = {
    HOME: '/',
    USERS: '/users',
    CATS: '/cats',
    DOGS: '/dogs',
  };

  constructor(private readonly router: Router) {}

  public navigationFor(roles: string[]): NavigationElement[] {
    const navigationElements = [].concat
      .apply(
        [],
        roles.map(role => this.NavigationElementsPerRole[role])
      );

    const navigationElementsForRole: NavigationElement[] = Array.from(new Set(navigationElements));
    return navigationElementsForRole.sort((a, b) => a.order - b.order);
  }

  public navigate(type: NavigationElementType): void {
    this.router.navigate([ this.RoutesPerNavigationElementType[type] ]);
  }

  public getSelected(): NavigationElementType {
    const pathname = window.location.pathname;

    const navigationElementTypeAsString = Object.keys(this.RoutesPerNavigationElementType)
      .find(key => this.RoutesPerNavigationElementType[key] === pathname);

    if (navigationElementTypeAsString as NavigationElementType) {
      return navigationElementTypeAsString as NavigationElementType;
    }
  }
}
