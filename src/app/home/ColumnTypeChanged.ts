export class ColumnTypeChanged {

    constructor(
        public columnName: String,
        public dataTypeChangedFrom: String,
        public dataTypeChangedTo: String
    ) { }
}
