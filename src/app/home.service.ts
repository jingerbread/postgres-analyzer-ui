import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Result} from "./home/Result";
import {of} from "rxjs/observable/of";
import {RequestOptions} from "@angular/http";

@Injectable()
export class HomeService {

    private getherDataUrl = 'http://localhost:8088/api/v1/gatherDataForAnalysis';  // URL to web api

    constructor(private messageService: MessageService, private http: HttpClient,) { }

    getMessage() {
        this.messageService.add('Yes');
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('Analyzer: ' + message);
    }

    getGetherDataResult(tableName: String): Observable<Result> {

        return this.http.post<Result>( this.getherDataUrl, "[\"" + tableName + "\"]",
            {headers: new HttpHeaders()
                .append('Accept', 'application/json')
                .append('Content-Type', 'application/json')});
    }

}
