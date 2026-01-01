import { Component, inject, Input } from '@angular/core';
import { MessagesService } from '../../../services/message.service';
import { AsyncPipe, NgClass } from '@angular/common';


@Component({
  selector: 'app-messages',
  imports: [AsyncPipe, NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  messageService = inject(MessagesService)


  ngOnInit() {

  }

  onClose() {
    this.messageService.clear();
  }
}
