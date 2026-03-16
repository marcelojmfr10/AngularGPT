import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxEvent,
  ChatMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './prosConsPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.messages.update((previous) => [...previous, { isGpt: false, text: prompt }]);
    this.isLoading.set(true);
    this.openAiService.prosConsDiscusser(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.content,
        },
      ]);
    });
  }
}
