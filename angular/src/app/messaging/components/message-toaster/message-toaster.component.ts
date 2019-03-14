import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'app-message-toaster',
  templateUrl: './message-toaster.component.html',
  styleUrls: ['./message-toaster.component.scss']
})
export class MessageToasterComponent implements OnInit {

  @Input() messages: Message[] = [];
  @Output() closeMessage = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseMessage(id: string) {
    this.closeMessage.emit(id);
  }
}
