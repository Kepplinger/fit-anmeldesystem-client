import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'fitHtmlSecurityBypass'
})
export class HtmlSecurityBypassPipe implements PipeTransform {

  public constructor(private domSanitizer: DomSanitizer) {
  }

  public transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
