import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

export class SVGData {
  constructor(public title: string, public color: string, public svg: string) { }
}

// data from https://github.com/simple-icons/simple-icons - v7.9.0


@Injectable({
  providedIn: 'root'
})
export class SimpleIconService {
  constructor(private http: HttpClient) { }

  loadIcons(): Observable<Array<SVGData>> {
    return this.http.get<Array<SVGData>>('assets/simple-icons-data.json');
  }
}
