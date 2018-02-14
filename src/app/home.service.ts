import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {GatherDataResult} from "./home/responses/GatherDataResult";
import {GetTableNamesResult} from "./home/responses/GetTableNamesResult";
import {AnalysisResult} from "./home/responses/AnalysisResult";
import {DBConnection} from "./home/connection/DBConnection";

@Injectable()
export class HomeService {

    private getTableNamesUrl = 'http://localhost:8088/api/v1/getTables?schema=';  // URL to web api
    private gatherDataUrl = 'http://localhost:8088/api/v1/gatherDataForAnalysis';  // URL to web api
    private coonect2DBUrl = 'http://localhost:8088/api/v1/connectToDB';  // URL to web api
    private performAnalysisUrl = 'http://localhost:8088/api/v1/analyze?analysisId=';  // URL to web api

    constructor( private http: HttpClient) { }

    getTableNames(schema: string) {
        return this.http.get<GetTableNamesResult>( this.getTableNamesUrl + schema,
            {headers: new HttpHeaders()
                    .append('Accept', 'application/json')
                    .append('Content-Type', 'application/json')});
    }

   connect2DB(dbConnection: DBConnection): Observable<GatherDataResult> {
        const dbConnectionJSON = JSON.stringify(dbConnection);
        console.log("Connect to db " + JSON.stringify(dbConnectionJSON));
        return this.http.post<GatherDataResult>( this.coonect2DBUrl, dbConnectionJSON,
            {headers: new HttpHeaders()
                    .append('Accept', 'application/json')
                    .append('Content-Type', 'application/json')});
    }

    gatherDataResult(tableName: string): Observable<GatherDataResult> {
        return this.http.post<GatherDataResult>( this.gatherDataUrl, "[\"" + tableName + "\"]",
            {headers: new HttpHeaders()
                .append('Accept', 'application/json')
                .append('Content-Type', 'application/json')});
    }

    performAnalysis(analysisId: string): Observable<AnalysisResult> {
        return this.http.post<AnalysisResult>( this.performAnalysisUrl + analysisId, null,
            {headers: new HttpHeaders()
                    .append('Accept', 'application/json')
                    .append('Content-Type', 'application/json')});
    }

}
