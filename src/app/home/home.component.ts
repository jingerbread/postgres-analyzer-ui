/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component, OnInit} from "@angular/core";
import { HomeService } from '../home.service';
import { Options } from '../options'
import {TableSchemaAnalysisResult} from "./responses/TableSchemaAnalysisResult";
import {ColumnSchemaChange} from "./responses/ColumnSchemaChange";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DBConnection} from "./connection/DBConnection";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    /****Current state****/
    dbConnectionForm: FormGroup;
    dbConnection: DBConnection;
    analysisId: string;
    currentTableName: string = 'Choose DB tables';
    analysisOptions = new Options(true, false, true);
    /*tableNames = ['view_backupjob', 'view_bkup_server-mapping', 'view_clonejob', 'view_host_config'];*/
    tableNames: Observable<String[]>;
    columnSchemaChanges: ColumnSchemaChange[] = [];
    schemaStatus: string;
    /****Display messages****/
    results: string[] = [];
    errors: string[] = [];
    /****Display options****/
    isResultsAndErrorsAreHidden: Boolean = true;
    analyzeIsDisabled: Boolean = true;
    gatherDataIsDisabled: Boolean = true;
    editConnectionDialogIsShown: Boolean = false;

    ngOnInit() {
        this.columnSchemaChanges = [];
        this.homeService.getTableNames('public').subscribe(r => {
            console.log("Get table names for public schema: " + JSON.stringify(r));
            this.tableNames = of(r.data);
        }, error => {
            this.isResultsAndErrorsAreHidden = false;
            console.error("Can't get table names for schema public error occurred: " + JSON.stringify(error.message));
            this.errors.push("Can't get table names for schema public error occurred: " + JSON.stringify(error.message));
        });
    }

    constructor(private fb: FormBuilder, private homeService: HomeService) {
        this.createForm();
    }

    createForm() {
        this.dbConnectionForm = this.fb.group({// <--- the FormControl called "name"
            dbUrl: ['', Validators.required ],
            schemaName: ['', Validators.required ],
            user: ['', Validators.required ],
            password: ['', Validators.required ]
        });
    }

    get connectionInfoIsInvalid() {
        return this.checkConnectionInfoInputIsInvalid();
    }

    checkConnectionInfoInputIsInvalid(): Boolean {
        let dbUrl = this.dbConnectionForm.get('dbUrl');
        let schemaName = this.dbConnectionForm.get('schemaName');
        let user = this.dbConnectionForm.get('user');
        let password = this.dbConnectionForm.get('password');
        return (dbUrl.invalid)
            || (schemaName.invalid)
            || (user.invalid)
            || (password.invalid);
    }

    closeEditConnectionDialog(): void {
        this.editConnectionDialogIsShown = false;
    }

    showEditConnectionDialog(): void {
        this.editConnectionDialogIsShown = true;
    }

    saveConnectionConfig(): void {
        if (!this.checkConnectionInfoInputIsInvalid()) {
            const connection = this.dbConnectionForm.value;
            this.dbConnection = new DBConnection(connection.dbUrl, connection.schemaName, connection.user, connection.password);
            console.log("Saved db connection config: " + JSON.stringify(this.dbConnection));
            this.closeEditConnectionDialog();
        }
    }

    gatherData(): void {
        // run server request
        this.homeService.gatherDataResult(this.currentTableName).subscribe(r => {
            console.log("Gather data result: " + JSON.stringify(r));
            this.results.push('Data has been collected, status ' + r.status + '. AnalysisId: ' + r.analysisId);
            this.analysisId = r.analysisId;
            this.analyzeIsDisabled = false;
            this.isResultsAndErrorsAreHidden = false;
            this.errors = [];
        }, error => {
            this.isResultsAndErrorsAreHidden = false;
            console.error("Can't gather data result error occurred: " + JSON.stringify(error.message));
            this.errors.push("Can't gather data result error occurred: " + JSON.stringify(error.message));
        });
    }

    analyze(): void {
        this.homeService.performAnalysis(this.analysisId).subscribe(r => {
            console.log("Analysis result: " + JSON.stringify(r));
            if (r.error != null) {
                this.errors.push(r.error)
            } else {
                this.results.push('Table schema analysis has been performed, status ' + r.status + '. AnalysisId: ' + r.analysisId + '.');
                if (r.data.length > 0) {
                    let analysis: TableSchemaAnalysisResult = r.data[0];
                    this.results.push('Schema Update Status: ' + analysis.schemaUpdateStatus);
                    /*this.results.push('Column Schema Changes: ' + JSON.stringify(analysis.columnChanges));*/

                    this.columnSchemaChanges = analysis.columnChanges;
                    this.schemaStatus = analysis.schemaUpdateStatus;
                    this.isResultsAndErrorsAreHidden = false;
                } else {
                    this.results.push('No data');
                }
            }
        }, error => {
            this.isResultsAndErrorsAreHidden = false;
            console.error("Can't perform table analysis error occured: " + JSON.stringify(error.message));
            this.errors.push("Can't perform table analysis error occured: " + JSON.stringify(error.message));
        });
    }

    selectTable(tableName: string) {
        this.currentTableName = tableName;
        this.gatherDataIsDisabled = false;
    }

    clear(): void {
        this.results.length = 0;
        this.results = [];
        this.errors = [];
        this.columnSchemaChanges = [];

        this.currentTableName = 'Choose DB tables';
        this.analysisId = null;

        this.isResultsAndErrorsAreHidden = true;
        this.analyzeIsDisabled = true;
        this.gatherDataIsDisabled = true;
        console.clear();
    }
}
