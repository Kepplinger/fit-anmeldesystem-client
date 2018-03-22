import { Company } from '../company';
import { FolderInfoMapper } from './folder-info-mapper';

export class CompanyMapper {

  public static mapJsonToCompany(companyJson: any): Company {

    if (companyJson != null) {
      let company = new Company();

      company.id = companyJson.id;
      company.timestamp = companyJson.timestamp;
      company.contact = companyJson.contact;
      company.name = companyJson.name;
      company.isPending = companyJson.isPending;
      company.folderInfo = FolderInfoMapper.mapJsonToFolderInfo(companyJson.folderInfo);
      company.address = companyJson.address;

      return company;
    } else {
      return null;
    }
  }

  public static mapJsonToCompanyList(companyJson: any[]): Company[] {

    if (companyJson != null) {
      let companies: Company[] = [];

      companyJson.forEach(
        (data: any) => {
          companies.push(CompanyMapper.mapJsonToCompany(data));
        }
      );

      return companies;
    } else {
      return null;
    }
  }

}
