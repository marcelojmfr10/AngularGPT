import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
  TextMessageEvent,
} from '@components/index';
import { AudioToTextResponse } from '@interfaces/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxFile],
  templateUrl: './audioToTextPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { isGpt: false, text }]);
    this.openAiService.audioToText(file, text).subscribe((resp) => this.handleResponse(resp));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcripción:
    __Duración:__ ${Math.round(resp.duration)} segundos.
    ## El texto es:
    ${resp.text}
    `;

    this.messages.update((prev) => [...prev, { isGpt: true, text }]);

    for (const segment of resp.segments) {
      const segmentMessage = `
    __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
    ${segment.text}
      `;

      this.messages.update((prev) => [...prev, { isGpt: true, text: segmentMessage }]);
    }
  }
}
