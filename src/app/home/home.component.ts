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

    model = new Options(true,false,false,['asd','a123','qwe'])

    tableNames = ['asd', 'qwe', '123', '789'];

    result:String;

    analysisId:String

    submitted = false;

    go(): void {
        // run server request
        this.homeService.getGatherDataResult("messages").subscribe(r => {
            console.log("Gather data result: " + JSON.stringify(r))
            this.result = 'Data has been collected, status ' + r.status + '. AnalysisId: ' + r.analysisId
            this.submitted = true;
            this.analysisId = r.analysisId
        });
        //showResult();
    }

    analyze(): void {
        this.homeService.performAnalysis(this.analysisId).subscribe(r => {
            console.log("Analysis result: " + JSON.stringify(r))
            this.result = 'Table schema analysis has been performed, status ' + r.status + '. AnalysisId: ' + r.analysisId  + "."
                + '\nSchemaUpdateStatus: ' + r.data[0].schemaUpdateStatus
             + '\nColumnAdded: ' + JSON.stringify(r.data[0].columnAdded)
                + '\nColumnDeleted: ' + JSON.stringify(r.data[0].columnDeleted)
                + '\nColumnTypeChanged: ' + JSON.stringify(r.data[0].columnTypeChanged);
        });
    }

    clear(): void {
        // clear previous results
    }

    showResult(): void {

    }
}
