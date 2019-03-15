import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-message-toaster',
  templateUrl: './message-toaster.component.html',
  styleUrls: [ './message-toaster.component.scss' ]
})
export class MessageToasterComponent implements OnInit {

  @Input() messages: Message[] = [];
  @Input() messageIds: string[] = [];
  @Output() closeMessage = new EventEmitter<string>();
  @Output() fixMessage = new EventEmitter<string>();
  @Output() unfixMessage = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseMessage(id: string) {
    this.closeMessage.emit(id);
  }

  onFixMessage(id: string) {
    this.fixMessage.emit(id);
  }

  onUnfixMessage(id: string) {
    this.unfixMessage.emit(id);
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }
}
