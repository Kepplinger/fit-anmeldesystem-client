export class SmtpConfig {
  public id: number;
  public timestamp: string;

  public host: string;
  public port: number;
  public mailAddress: string;
  public password: string;

  public constructor(host?: string,
                     port?: number,
                     mailAddress?: string,
                     password?: string,
                     id?: number,
                     timestamp?: string) {
    this.host = host;
    this.port = port;
    this.mailAddress = mailAddress;
    this.password = password;
    this.id = id;
    this.timestamp = timestamp;
  }
}
