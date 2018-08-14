import { Company } from './company';
import { Tag } from './tag';

export class CompanyTag {
  public id: number;
  public timestamp: string;

  public fk_Company: number;
  public company: Company;

  public fk_Tag: number;
  public tag: Tag;


  public constructor(fk_Company: number, fk_Tag: number, tag?: Tag) {
    this.fk_Company = fk_Company;
    this.fk_Tag = fk_Tag;
    this.tag = tag;
  }
}
