import {Column} from "./Column";
import {ColumnTypeChanged} from "./ColumnTypeChanged";

export class ColumnSchemaChange {

    constructor(
        public name: string,
        public action: string,
        public oldType: string,
        public newType: string
    ) { }
}
