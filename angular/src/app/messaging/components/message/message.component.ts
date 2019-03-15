import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../models/message.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.scss' ]
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @Output() close = new EventEmitter<void>();
  @Output() isHovered = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  mouseEnter() {
    this.isHovered.emit(true);
  }

  mouseLeave() {
    this.isHovered.emit(false);
  }

  closeMessage() {
    this.close.emit();
  }

  formatTimestamp(timestamp: Date) {
    return format(timestamp, 'YYYY/MM/DD - HH:mm:ss-SSS');
  }
}
