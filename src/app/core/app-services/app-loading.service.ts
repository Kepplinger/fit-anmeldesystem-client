import { Injectable } from '@angular/core';

@Injectable()
export class AppLoadingService {

  public loadingBuffer: boolean[] = [];

  public constructor() {
  }

  public startLoading(): void {
    this.loadingBuffer.push(true);
  }

  public endLoading(): void {
    this.loadingBuffer.pop();
  }

  public isAppLoading(): boolean {
    return this.loadingBuffer.length > 0;
  }
}
