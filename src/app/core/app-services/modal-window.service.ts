import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable()
export class ModalWindowService {

  public constructor() {
  }

  /**
   * Similar to the confirm() but fancy
   * @param title
   * @param message
   * @param options
   * @returns {Promise<boolean>}
   */
  public async confirm(title: string, message: string, options: any = {}): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        alertify.confirm()
          .setting({
            title: title,
            message: message,
            onok: () => {
              resolve(true);
            },
            oncancel: () => {
              resolve(false);
            }
          })
          .set(options)
          .show();
      }
    );
  }

  /**
   * Similar to the prompt() but fancy
   * @param title
   * @param message
   * @param options
   * @returns {Promise<string>}
   */
  public async prompt(title: string, options: any = {}): Promise<string> {
    return new Promise<string>(
      (resolve) => {
        alertify.prompt()
          .setting({
            title: title,
            onok: (result: string) => {
              resolve(result);
            },
          })
          .set(options)
          .show();
      }
    );
  }

  public async alert(title: string, message: string, options: any = {}): Promise<void> {
    return new Promise<void>(
      (resolve) => {
        alertify.alert()
          .setting({
            title: title,
            message: message,
            onok: () => {
              resolve();
            },
          })
          .set(options)
          .show();
      }
    );
  }
}
