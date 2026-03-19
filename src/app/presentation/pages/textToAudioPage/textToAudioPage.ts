import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelector,
  TextMessageBoxEvent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelector],
  templateUrl: './textToAudioPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public voices = signal([
    { id: 'nova', text: 'Nova' },
    { id: 'alloy', text: 'Alloy' },
    { id: 'echo', text: 'Echo' },
    { id: 'fable', text: 'Fable' },
    { id: 'onyx', text: 'Onyx' },
    { id: 'shimmer', text: 'Shimmer' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;
    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);
    this.isLoading.set(true);

    this.openAiService
      .textToAudio(prompt, selectedOption)
      .subscribe(({ message, ok, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: message, isGpt: true, audioUrl: audioUrl },
        ]);
      });
  }
}
