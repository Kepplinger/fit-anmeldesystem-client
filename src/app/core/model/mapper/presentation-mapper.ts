import { Presentation } from '../presentation';
import { Branch } from '../branch';

export class PresentationMapper {

  public static mapJsonToPresentation(presentationJson: any): Presentation {

    if (presentationJson != null) {
      let presentation = new Presentation();

      presentation.id = presentationJson.id;
      presentation.branches = presentationJson.branches.map(b => b.branch);
      presentation.description = presentationJson.description;
      presentation.file = presentationJson.file;
      presentation.isAccepted = presentationJson.isAccepted;
      presentation.roomNumber = presentationJson.roomNumber;
      presentation.title = presentationJson.title;
      presentation.timestamp = presentationJson.timestamp;

      return presentation;
    } else {
      return null;
    }
  }

  public static mapJsonToPresentationList(presentationJson: any[]): Presentation[] {

    if (presentationJson != null) {
      let presentations: Presentation[] = [];

      presentationJson.forEach(
        (data: any) => {
          presentations.push(PresentationMapper.mapJsonToPresentation(data));
        }
      );

      return presentations;
    } else {
      return null;
    }
  }

  public static mapPresentationToJson(presentation: Presentation): any {

    if (presentation != null) {
      let json: any = presentation;

      json.branches = presentation.branches.map(
        (branch: Branch) => {
          return {
            fk_Presentation: presentation.id,
            fk_Branch: branch.id
          };
        }
      );
      return json;
    } else {
      return null;
    }
  }

}
