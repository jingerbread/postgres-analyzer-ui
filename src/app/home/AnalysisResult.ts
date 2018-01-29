import {TableSchemaAnalysisResult} from "./TableSchemaAnalysisResult";

export class AnalysisResult {

    constructor(
        public status: string,
        public analysisId: string,
        public statusCode: number,
        public successful: boolean,
        public error: string,
        public data: TableSchemaAnalysisResult[]
    ) { }
}
