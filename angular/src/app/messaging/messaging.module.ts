import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageToasterComponent } from './components/message-toaster/message-toaster.component';
import { MessagingContainerComponent } from './containers/messaging-container/messaging-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageToasterComponent,
    MessagingContainerComponent
  ],
  exports: [
    MessagingContainerComponent
  ]
})
export class MessagingModule {}
