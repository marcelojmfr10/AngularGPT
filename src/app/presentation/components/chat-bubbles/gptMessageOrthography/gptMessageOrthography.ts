import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gptMessageOrthography.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthography {
  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input() errors: string[] = [];
}
