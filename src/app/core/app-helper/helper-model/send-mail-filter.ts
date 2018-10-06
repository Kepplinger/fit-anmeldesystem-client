import { Branch } from '../../model/branch';
import { MemberStatus } from '../../model/member-status';
import { Tag } from '../../model/tag';

export class SendMailFilter {
  useCurrentFitOnly: boolean;
  searchText: string;
  branches: Branch[];
  memberStati: MemberStatus[];
  tags: Tag[];

  public constructor() {
    this.searchText = '';
    this.branches = [];
    this.memberStati = [];
    this.tags = [];
  }
}
