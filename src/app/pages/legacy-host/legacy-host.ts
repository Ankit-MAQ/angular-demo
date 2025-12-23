// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-legacy-host',
//   imports: [],
//   templateUrl: './legacy-host.html',
//   styleUrl: './legacy-host.css',
// })
// export class LegacyHost {

// }

import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-legacy-host',
  imports: [],
  templateUrl: './legacy-host.html',
  styleUrl: './legacy-host.css',
})
export class LegacyHost {

  @ViewChild('legacyContainer', { static: true })
  legacyContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(
      'https://localhost:44377/Default.aspx',
      { withCredentials: true,
        responseType: 'text' }
    ).subscribe(html => {
      this.legacyContainer.nativeElement.innerHTML = html;
    });
  }
}

