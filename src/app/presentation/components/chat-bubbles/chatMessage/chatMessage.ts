import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chatMessage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessage {
  @Input({ required: true }) text!: string;
}
