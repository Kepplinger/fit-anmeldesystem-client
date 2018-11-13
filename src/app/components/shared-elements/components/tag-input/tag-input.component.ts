import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fit-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {

  @Output()
  public tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input()
  public tags: string[];

  @Input()
  public autoComplete: boolean = false;

  @Input()
  public autoCompleteItems: string[] = [];

  @Input()
  public placeholder: string;

  @Input()
  public secondaryPlaceholder: string;

  public focus = false;

  public constructor() {
  }

  public updatedTags() {
    this.tagsChange.emit(this.tags);
  }

  public removeItem(index: number): void {
    this.tags.splice(index, 1);
  }
}
