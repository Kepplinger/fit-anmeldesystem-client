import { Component, Input } from '@angular/core';

@Component({
  selector: 'fit-page-html-editor',
  templateUrl: './page-html-editor.component.html',
  styleUrls: ['./page-html-editor.component.scss']
})
export class PageHtmlEditorComponent {

  @Input()
  public html: string = `<input type="text"/>`;

  @Input()
  public htmlChange: string;

  public editorOptions = {
    language: 'html',
    minimap: {
      enabled: false
    }
  };
}
