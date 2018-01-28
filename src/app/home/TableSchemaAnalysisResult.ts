import {Column} from "./Column";
import {ColumnTypeChanged} from "./ColumnTypeChanged";
import {ColumnSchemaChange} from "./ColumnSchemaChange";

export class TableSchemaAnalysisResult {

    constructor(
        public oldVersion: number,
        public newVersion: number,
        public tableName: string,
        public schemaUpdateStatus: string,
        public columnChanges: ColumnSchemaChange[]
    ) { }
}
