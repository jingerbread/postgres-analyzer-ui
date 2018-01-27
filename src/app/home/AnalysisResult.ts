import {TableSchemaAnalysisResult} from "./TableSchemaAnalysisResult";

export class AnalysisResult {

    constructor(
        public status: String,
        public analysisId: String,
        public statusCode: number,
        public successful: boolean,
        public data: TableSchemaAnalysisResult[]
    ) { }
}
