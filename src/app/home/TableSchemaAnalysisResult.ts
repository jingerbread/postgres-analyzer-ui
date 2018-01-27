import {Column} from "./Column";
import {ColumnTypeChanged} from "./ColumnTypeChanged";

export class TableSchemaAnalysisResult {

    constructor(
        public oldVersion: number,
        public newVersion: number,
        public schemaUpdateStatus: String,
        public columnAdded: Column[],
        public columnDeleted: Column[],
        public columnTypeChanged: ColumnTypeChanged[],
    ) { }
}
