import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { PickedFile } from './picked-file';
import { FilePickerError } from './file-picker-error';


@Directive({
  selector: '[fitFilePicker]'
})
export class FilePickerDirective implements OnInit {

  @Input()
  public accept = '';

  @Input()
  public maxSize = 0;

  @Input()
  get multiple() {
    return this._multiple;
  }

  set multiple(value: any) {
    this._multiple = coerceBooleanProperty(value);
  }

  @Output()
  public filePick = new EventEmitter<PickedFile | FilePickerError>();

  private _multiple: boolean;
  private input: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit() {
    this.input = this.renderer.createElement('input');
    this.renderer.appendChild(this.el.nativeElement, this.input);

    this.renderer.setAttribute(this.input, 'type', 'file');
    this.renderer.setAttribute(this.input, 'accept', this.accept);
    this.renderer.setStyle(this.input, 'display', 'none');

    if (this.multiple) {
      this.renderer.setAttribute(this.input, 'multiple', 'multiple');
    }

    this.renderer.listen(this.input, 'change', (event: any) => {
      for (let file of event.target.files) {
        this.readFile(file);
      }
    });
  }

  public reset() {
    if (!this.input) {
      console.error('It seems that ngOnInit() has not been executed or that the hidden input element is null. Did you mess with the DOM?');
      return;
    }

    this.input.value = null;
  }

  @HostListener('click')
  private browse() {
    if (!this.input) {
      console.error('It seems that ngOnInit() has not been executed or that the hidden input element is null. Did you mess with the DOM?');
      return;
    }

    this.input.click();
  }

  private readFile(file: File) {

    if (this.maxSize > 0 && file.size > this.maxSize) {
      this.filePick.emit(FilePickerError.FileTooBig);
    } else {
      const reader = new FileReader();

      reader.onload = (loaded: ProgressEvent) => {
        const fileReader = loaded.target as FileReader;
        const pickedFile = new PickedFile(file.lastModifiedDate, file.name, file.size, file.type, fileReader.result);

        this.filePick.emit(pickedFile);
      };

      reader.readAsDataURL(file);
    }
  }
}

function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
