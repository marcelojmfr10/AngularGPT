import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import {
  MyMessage,
  TextMessageBox,
  TypingLoader,
  GptMessageOrthography,
  ChatMessage,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [MyMessage, TypingLoader, TextMessageBox, GptMessageOrthography, ChatMessage],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((previous) => [...previous, { isGpt: false, text: prompt }]);

    this.openAiService.checkOrthography(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((messages) => [
        ...messages,
        { isGpt: true, text: resp.message, info: resp },
      ]);
    });
  }
}
