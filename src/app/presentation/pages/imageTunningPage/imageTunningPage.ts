import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageEditableImage,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageEditableImage],
  templateUrl: './imageTunningPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPage {
  public messages = signal<Message[]>([
    // {
    //   isGpt: true,
    //   text: 'pasta carbonara',
    //   imageInfo: {
    //     alt: 'pasta',
    //     url: 'http://localhost:3000/gpt/image-generator/1774399472975.png',
    //   },
    // },
  ]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);
  public maskImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService
      .imageGeneration(prompt, this.originalImage(), this.maskImage())
      .subscribe((resp) => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update((prev) => [...prev, { isGpt: true, text: resp.alt, imageInfo: resp }]);
      });
  }

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);
  }

  generateVariation() {
    if (!this.originalImage()) return;
    this.isLoading.set(true);
    this.openAiService.imageVariation(this.originalImage()!).subscribe((resp) => {
      this.isLoading.set(false);
      if (!resp) return;

      this.messages.update((prev) => [...prev, { isGpt: true, text: resp.alt, imageInfo: resp }]);
    });
  }
}
