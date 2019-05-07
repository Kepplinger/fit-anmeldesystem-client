import { Component, Input } from '@angular/core';
import { ChangeProtocol } from '../../../../../core/model/change-protocol';

@Component({
  selector: 'fit-changelog-displayed-change',
  templateUrl: './changelog-displayed-change.component.html',
  styleUrls: ['./changelog-displayed-change.component.scss']
})
export class ChangelogDisplayedChangeComponent {
  @Input()
  public change: ChangeProtocol = new ChangeProtocol();
}
