import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationContainerComponent } from './containers/navigation-container/navigation-container.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationElementComponent } from './components/navigation-element/navigation-element.component';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    EffectsModule.forFeature([ Effects ]),
  ],
  declarations: [
    NavigationContainerComponent,
    NavigationComponent,
    NavigationElementComponent
  ],
  exports: [
    NavigationContainerComponent
  ]
})
export class NavigationModule { }
