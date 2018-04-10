import { Component, EventEmitter, Input, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'fit-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {

  @Output()
  public tagsChanges: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input()
  public tags: string[];

  public focus = false;

  public constructor() {
  }

  public updatedTags() {
    this.tagsChanges.emit(this.tags);
  }

  public removeItem(index: number): void {
    this.tags.splice(index, 1);
  }
}
