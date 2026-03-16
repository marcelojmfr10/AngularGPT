import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message',
  imports: [MarkdownModule],
  templateUrl: './chatMessage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessage {
  @Input({ required: true }) text!: string;
}
