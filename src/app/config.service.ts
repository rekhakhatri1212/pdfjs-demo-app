import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
    url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
    constructor(private http: HttpClient) { }

    public downloadPDF(): any {
        return this.http.get(this.url, { responseType: 'blob' });
    }
}