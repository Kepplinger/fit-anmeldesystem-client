import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fit-admin-html-editor',
  templateUrl: './admin-html-editor.component.html',
  styleUrls: ['./admin-html-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHtmlEditorComponent {

  @Input()
  public value: string = '';

  @Input()
  public currentIndex: number;

  @Input()
  public style: any = {};

  @Input()
  public placeholder: string = 'Text eingeben ...';

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter();

  @Output()
  public currentIndexChange: EventEmitter<number> = new EventEmitter();

  @Output()
  public quillEditorChange: EventEmitter<any> = new EventEmitter();

  @Output()
  public editorCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  public selectionChanged: EventEmitter<any> = new EventEmitter();

  public quillEditor: any;

  // public customOptions: any;
  // public quillModules: any;

  // public constructor() {
  //   this.customOptions = [{
  //     import: 'attributors/style/size',
  //     whitelist: ['10px', '13px', '16px', '20px', '26px', '32px', '44px']
  //   }];
  //
  //   this.quillModules = {
  //     toolbar: [
  //       [{'font': []}],
  //       [{'size': ['10px', '13px', '16px', '20px', '26px', '32px', '44px']}],
  //       ['bold', 'italic', 'underline', 'strike'],
  //       ['blockquote', 'code-block'],
  //       [{'color': []}, {'background': []}],
  //       [{ 'align': [] }],
  //       [{'indent': '-1'}, {'indent': '+1'}],
  //       [{'list': 'ordered'}, {'list': 'bullet'}],
  //       ['showHtml']
  //     ]
  //   };
  // }

  public onContentChanged(): void {
    this.updateCurrentIndex();
    this.valueChange.emit(this.value);
  }

  public onEditorCreated(event: any): void {
    setTimeout(() => {
      this.quillEditor = event;
      this.quillEditorChange.emit(this.quillEditor);
      this.editorCreated.emit(this.quillEditor);
    }, 0);
  }

  public onSelectionChanged(event: any): void {
    this.updateCurrentIndex();
    this.selectionChanged.emit(event);
  }

  public updateCurrentIndex(): void {
    if (this.quillEditor != null) {
      let selection: any = this.quillEditor.getSelection();

      if (selection != null) {
        this.currentIndex = selection.index;
        this.currentIndexChange.emit(this.currentIndex);
      }
    }
  }
}
