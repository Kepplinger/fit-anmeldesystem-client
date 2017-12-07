import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'fit-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  @Output()
  public tagsChanges: EventEmitter<string[]> = new EventEmitter<string[]>();

  public tags: string[];
  public focus = false;

  public constructor() {
  }

  public ngOnInit() {
  }

  public updatedTags() {
    this.tagsChanges.emit(this.tags);
  }

  public removeItem(index: number): void {
    this.tags.splice(index, 1);
  }
}
