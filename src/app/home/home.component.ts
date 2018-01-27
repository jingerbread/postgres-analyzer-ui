/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { HomeService } from '../home.service';
import { MessageService } from '../message.service';

import { Options } from '../options'
import {Result} from "./Result";
import {Observable} from "rxjs";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {

    constructor(private messageService: MessageService, private homeService: HomeService) { }

    analyzeIsDisabled:Boolean = true;

    model = new Options(true,false,true,['view_backupjob','view_bkup_server-mapping','qwview_clonejobe', 'view_host_config'])

    tableNames = ['view_backupjob', 'view_bkup_server-mapping', 'view_clonejob', 'view_host_config'];

    results: string[] = [];

    errors: string[] = [];

    analysisId:string

    submitted = false;

    isCleared = true;

    currentTableName = 'Choose DB tables';

    isAnalyzeDisabled = true;

    gatherData(): void {
        // run server request
        this.homeService.getGatherDataResult("messages").subscribe(r => {
            console.log("Gather data result: " + JSON.stringify(r))
            this.results.push('Data has been collected, status ' + r.status + '. AnalysisId: ' + r.analysisId);
            this.submitted = true;
            this.analysisId = r.analysisId
            this.analyzeIsDisabled = false;
            this.isCleared = false;
            this.isAnalyzeDisabled = false;
            this.errors = [];
        }, error => {
            this.isCleared = false;
            console.error("Can't gather data result error occured: " + JSON.stringify(error.message));
            this.errors.push("Can't gather data result error occured: " + JSON.stringify(error.message);
        });
    }

    analyze(): void {
        this.homeService.performAnalysis(this.analysisId).subscribe(r => {
            console.log("Analysis result: " + JSON.stringify(r))
            this.results.push('Table schema analysis has been performed, status ' + r.status + '. AnalysisId: ' + r.analysisId  + '.');
            this.results.push('SchemaUpdateStatus: ' + r.data[0].schemaUpdateStatus);
            this.results.push('ColumnAdded: ' + JSON.stringify(r.data[0].columnAdded));
            this.results.push('ColumnDeleted: ' + JSON.stringify(r.data[0].columnDeleted));
            this.results.push('ColumnTypeChanged: ' + JSON.stringify(r.data[0].columnTypeChanged));
            this.isCleared = false;
        }, error => {
            this.isCleared = false;
            console.error("Can't perform table analysis error occured: " + JSON.stringify(error.message));
            this.errors.push("Can't perform table analysis error occured: " + JSON.stringify(error.message);
        );
    }

    selectTable(tableName: String) {
        this.currentTableName = tableName;
    }

    clear(): void {
        this.analyzeIsDisabled = true;
        this.currentTableName = 'Choose DB tables';
        this.isCleared = true;
        this.results.length = 0;
        this.results = [];
        this.errors = [];
        console.clear();
    }
}
