/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { HomeService } from '../home.service';
import { MessageService } from '../message.service';

import { Options } from '../options'

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {

    constructor(private messageService: MessageService) { }

    model = new Options(true,false,false,['asd','a123','qwe'])

    tableNames = ['asd', 'qwe', '123', '789'];

    result:String;

    submitted = false;

    go(): void {
        // run server request
        this.submitted = true;
        console.log("model "+this.model.columns_added+" "+this.model.rows_updated+" "+this.model.schema_version+" "+this.model.tableNames);
        this.messageService.add(`Success!`);
        this.result = 'Data has been '
        //showResult();
    }

    analyze(): void {
        // run server request
    }

    clear(): void {
        // clear previous results
    }

    showResult(): void {

    }
}
