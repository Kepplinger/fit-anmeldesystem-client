import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { PickedFile } from './picked-file';

@Directive({
  selector: '[fitFileDropzone]'
})
export class FileDropzoneDirective implements OnInit {

  @Input()
  public maxSize = 0;

  @Output()
  public fileDrop = new EventEmitter<PickedFile>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'dragenter', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'dragover', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'drop', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();

      let dt = event.dataTransfer;
      let files = dt.files;

      this.handleFiles(files);
    });
  }

  private handleFiles(files: FileList) {

    let file = files[0];

    if ((this.maxSize > 0 && file.size < this.maxSize) || this.maxSize <= 0) {
      const reader = new FileReader();

      reader.onload = (loaded: ProgressEvent) => {
        const fileReader = loaded.target as FileReader;
        const droppedFile = new PickedFile(file.lastModifiedDate, file.name, file.size, file.type, fileReader.result);

        this.fileDrop.emit(droppedFile);
      };

      reader.readAsDataURL(file);

    } else {
      console.log('ahhhh');
    }
  }
}
