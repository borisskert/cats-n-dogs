import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { getMessages } from '../../+state/selectors';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.interface';
import { CloseMessage } from '../../+state/actions';

@Component({
  selector: 'app-messaging-container',
  templateUrl: './messaging-container.component.html',
  styleUrls: ['./messaging-container.component.scss']
})
export class MessagingContainerComponent implements OnInit {

  private messages$: Observable<Message[]>;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.messages$ = this.store.select(getMessages);
  }

  closeMessage($event: string) {
    this.store.dispatch(new CloseMessage($event));
  }
}
