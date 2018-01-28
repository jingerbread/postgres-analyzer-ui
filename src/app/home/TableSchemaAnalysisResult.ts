import {Column} from "./Column";
import {ColumnTypeChanged} from "./ColumnTypeChanged";

export class TableSchemaAnalysisResult {

    constructor(
        public oldVersion: number,
        public newVersion: number,
        public tableName: string,
        public schemaUpdateStatus: string,
        public columnAdded: Column[],
        public columnDeleted: Column[],
        public columnTypeChanged: ColumnTypeChanged[],
    ) { }
}
