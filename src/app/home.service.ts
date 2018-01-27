import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Result} from "./home/Result";
import {of} from "rxjs/observable/of";
import {RequestOptions} from "@angular/http";
import {AnalysisResult} from "./home/AnalysisResult";

@Injectable()
export class HomeService {

    private gatherDataUrl = 'http://localhost:8088/api/v1/gatherDataForAnalysis';  // URL to web api
    private performAnalysisUrl = 'http://localhost:8088/api/v1/analyze?analysisId=';  // URL to web api

    constructor(private messageService: MessageService, private http: HttpClient,) { }

    getMessage() {
        this.messageService.add('Yes');
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('Analyzer: ' + message);
    }

    getGatherDataResult(tableName: String): Observable<Result> {

        return this.http.post<Result>( this.gatherDataUrl, "[\"" + tableName + "\"]",
            {headers: new HttpHeaders()
                .append('Accept', 'application/json')
                .append('Content-Type', 'application/json')});
    }

    performAnalysis(analysisId: String): Observable<AnalysisResult> {

        return this.http.post<AnalysisResult>( this.performAnalysisUrl + 'AiGeJ'/*TODO: analysisId*/, null,
            {headers: new HttpHeaders()
                    .append('Accept', 'application/json')
                    .append('Content-Type', 'application/json')});
    }

}
