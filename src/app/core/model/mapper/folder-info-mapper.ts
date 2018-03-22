import { FolderInfo } from '../folder-info';

export class FolderInfoMapper {

  public static mapJsonToFolderInfo(folderInfoJson: any): FolderInfo {

    if (folderInfoJson != null) {
      let folderInfo = new FolderInfo();

      folderInfo.id = folderInfoJson.id;
      folderInfo.timestamp = folderInfoJson.timestamp;
      folderInfo.branch = folderInfoJson.branch;
      folderInfo.logo = folderInfoJson.logo;
      folderInfo.homepage = folderInfoJson.homepage;
      folderInfo.email = folderInfoJson.email;
      folderInfo.phoneNumber = folderInfoJson.phoneNumber;
      folderInfo.establishmentsAut = folderInfoJson.establishmentsAut.split(';');
      folderInfo.establishmentsInt = folderInfoJson.establishmentsInt.split(';');
      folderInfo.establishmentsCountAut = folderInfoJson.establishmentsCountAut;
      folderInfo.establishmentsCountInt = folderInfoJson.establishmentsCountInt;

      return folderInfo;
    } else {
      return null;
    }
  }

  public static mapJsonToFolderInfoList(folderInfoJson: any[]): FolderInfo[] {

    if (folderInfoJson != null) {
      let folderInfos: FolderInfo[] = [];

      folderInfoJson.forEach(
        (data: any) => {
          folderInfos.push(FolderInfoMapper.mapJsonToFolderInfo(data));
        }
      );

      return folderInfos;
    } else {
      return null;
    }
  }

}
