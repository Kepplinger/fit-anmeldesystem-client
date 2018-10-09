import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare let $: any;

@Component({
  selector: 'fit-member-code-input',
  templateUrl: './member-code-input.component.html',
  styleUrls: ['./member-code-input.component.scss']
})
export class MemberCodeInputComponent implements OnInit {

  @Input()
  public loginCode: string;

  @Input()
  public hasFailed: boolean;

  @Input()
  public disabled: boolean;

  @Output()
  public loginCodeChange: EventEmitter<string> = new EventEmitter<string>();

  public constructor() {
  }

  public ngOnInit(): void {
    $('.code-part').autotab({
      maxlength: 4,
      format: 'custom', pattern: '[-]'
    });
  }

  public emitCode() {
    setTimeout(() => {
      let codePart1: string = $('#code-part1').val();
      let codePart2: string = $('#code-part2').val();
      let codePart3: string = $('#code-part3').val();

      console.log(codePart1 + '-' + codePart2 + '-' + codePart3);
      this.loginCodeChange.emit(codePart1 + '-' + codePart2 + '-' + codePart3);
    }, 0);
  }
}
