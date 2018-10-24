import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fit-page-html-editor',
  templateUrl: './page-html-editor.component.html',
  styleUrls: ['./page-html-editor.component.scss']
})
export class PageHtmlEditorComponent {

  @Input()
  public html: string;

  @Output()
  public htmlChange: EventEmitter<string> = new EventEmitter();

  public editorOptions = {
    language: 'html',
    minimap: {
      enabled: false
    }
  };

  public constructor() {
  }

  public htmlChanged(): void {
    this.htmlChange.emit(this.html);
  }
}
