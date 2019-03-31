import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { getAutoDismiss, getMessageIds, getMessages } from '../../+state/selectors';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.interface';
import { AutoDismissMessages, CloseMessage, FixMessage, UnfixMessage } from '../../+state/actions';

@Component({
  selector: 'app-messaging-container',
  templateUrl: './messaging-container.component.html',
  styleUrls: [ './messaging-container.component.scss' ]
})
export class MessagingContainerComponent implements OnInit {

  public messages$: Observable<Message[]>;
  public messageIds$: Observable<string[]>;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.messages$ = this.store.select(getMessages);
    this.messageIds$ = this.store.select(getMessageIds);

    this.store.dispatch(new AutoDismissMessages());
  }

  closeMessage($event: string) {
    this.store.dispatch(new UnfixMessage($event));
    this.store.dispatch(new CloseMessage($event));
  }

  fixMessage($event: string) {
    this.store.dispatch(new FixMessage($event));
  }

  unfixMessage($event: string) {
    this.store.dispatch(new UnfixMessage($event));
  }
}
