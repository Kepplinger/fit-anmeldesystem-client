import { FormWarnings } from './helper-model/form-warnings';

export class ModalTemplateCreatorHelper {

  public static getRegistrationWarning(formWarnings: FormWarnings): string {
    let listPoints: string = '';

    if (formWarnings.noLogo) {
      listPoints += `<li>Firmen-Logo (Schritt 2)</li>`;
    }
    if (formWarnings.noRepresentativeLogos) {
      listPoints += `<li>Vertreter-Bilder (Schritt 3)</li>`;
    }
    if (formWarnings.noLocation) {
      listPoints += `<li>Standplatz (Schritt 4)</li>`;
    }

    return `
    <div class="text-bold">Betroffene Felder: </div>

    <ul>` + listPoints + `</ul>

    <p>
      Diese Felder müssen bis zum FIT ausgefüllt werden. Sie können die Anmel jetzt abschließen,
      müssen aber diese Felder im nachhinein noch ausfüllen.
    </p>
    `;
  }

  public static getNextStepWarning(): string {
    return `
    <h5>Nicht alle Pflichtfelder wurden korrekt ausgefüllt!</h5>
    <p class="text-justify">Sind Sie sicher dass Sie fortfahren möchten?</p>`;
  }

  public static getBasicModalOptions(ok: string, cancel: string): any {
    return {
      closableByDimmer: false,
      movable: false,
      labels: {ok: ok, cancel: cancel}
    };
  }

}
