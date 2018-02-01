import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Area } from '../../../../../core/model/area';
import { Location } from '../../../../../core/model/location';
import { PickedFile } from '../../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../../libs/file-picker/file-picker-error';

declare let $: any;

@Component({
  selector: 'fit-edit-area-modal',
  templateUrl: './edit-area-modal.component.html',
  styleUrls: ['./edit-area-modal.component.scss'],
})
export class EditAreaModalComponent implements OnInit, OnChanges {

  @ViewChild('areaBounds')
  public areaBounds: ElementRef;

  @Input()
  public area: Area;

  public pickedFile: PickedFile = new PickedFile();

  public constructor(private changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['area'] && this.area != null) {
      this.pickedFile.dataURL = this.area.graphicUrl;
      this.pickedFile.name = this.area.graphicUrl;
    }
  }

  public onDragEnd(location: Location, event: any) {
    // location.xCoordinate = $(event).position().left / $(this.areaBounds.nativeElement).width();
    // location.yCoordinate = $(event).position().top  / $(this.areaBounds.nativeElement).height();

    console.log('==============================');
    console.log($(event).position().left / $(this.areaBounds.nativeElement).width() * 100 + '%');
    console.log($(event).position().top / $(this.areaBounds.nativeElement).height() * 100 + '%');
  }

  public filePicked(file: PickedFile | FilePickerError): void {

    if (file instanceof PickedFile) {
      this.pickedFile = file;
      this.area.graphicUrl = file.dataURL;
      this.changeDetector.detectChanges();
    } else if (file === FilePickerError.FileTooBig) {
      console.log('too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.log('invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.log('undefined input');
    }
  }

}
