import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'fit-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  public tags: string[];
  public focus = false;

  public constructor() {
  }

  public ngOnInit() {
  }

  public removeItem(index: number): void {
    this.tags.splice(index, 1);
  }
}
