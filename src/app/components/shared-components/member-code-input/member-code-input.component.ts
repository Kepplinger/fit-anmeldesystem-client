import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fit-member-code-input',
  templateUrl: './member-code-input.component.html',
  styleUrls: ['./member-code-input.component.scss']
})
export class MemberCodeInputComponent {

  @Input()
  public loginCode: string;

  @Input()
  public hasFailed: boolean;

  @Output()
  public loginCodeChange: EventEmitter<string> = new EventEmitter<string>();

  public checkKeySignature(event: any): void {
    console.log('sadfasdf');
    // setTimeout(() => {
      let code = event.target.value;

      if (this.noHyphenCodeLength(code) % 4 === 0 && code.length !== 0 && code.length < 12 && !code.endsWith('-')) {
        this.loginCode = code + '-';
      }
    // }, 0);
    this.loginCodeChange.emit(this.loginCode);
  }

  // noinspection JSMethodCanBeStatic
  private noHyphenCodeLength(code: string): number {
    let hyphenCount = 0;

    for (let i = 0; i < code.length; i++) {
      if (code[i] === '-') {
        hyphenCount++;
      }
    }

    return code.length - hyphenCount;
  }

}
