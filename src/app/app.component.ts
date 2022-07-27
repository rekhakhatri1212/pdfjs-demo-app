import { Component } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ConfigService } from './config.service';
import { PdfService } from './pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdfjs-demo-app';

  constructor(public configService: ConfigService, public pdfService: PdfService) {
    this.downloadPDF();
  }

  downloadPDF() {
    var mediaType = 'application/pdf';
    this.configService.downloadPDF().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: mediaType });
        var file = new File([blob], "name");
        this.pdfService.pdfToImageDataURLAsync(file);
      }, (e: any) => { throwError(e); }
    );
  }
}
