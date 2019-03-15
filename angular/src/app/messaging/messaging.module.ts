import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageToasterComponent } from './components/message-toaster/message-toaster.component';
import { MessagingContainerComponent } from './containers/messaging-container/messaging-container.component';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ Effects ]),
  ],
  declarations: [
    MessageToasterComponent,
    MessagingContainerComponent,
    MessageComponent
  ],
  exports: [
    MessagingContainerComponent
  ]
})
export class MessagingModule {}
