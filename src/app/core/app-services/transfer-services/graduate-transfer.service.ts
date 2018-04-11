import { Injectable } from '@angular/core';
import { Graduate } from '../../model/graduate';

@Injectable()
export class GraduateTransferService {

  private graduateBuffer: Graduate[] = [];

  public addGraduate(graduate: Graduate): void {
    if (graduate.id != null) {
      this.graduateBuffer.push(graduate);
    }
  }

  public getGraduate(graduateId: number): Graduate {
    let graduate: Graduate = this.graduateBuffer.find(b => b.id === graduateId);

    if (graduate != null) {
      this.graduateBuffer.splice(this.graduateBuffer.indexOf(graduate), 1);
    }

    return graduate;
  }
}
