import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './imageGenerationPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.imageGeneration(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      if (!resp) return;

      this.messages.update((prev) => [...prev, { isGpt: true, text: resp.alt, imageInfo: resp }]);
    });
  }
}
