
export class GetTableNamesResult {

    constructor(
        public status: string,
        public analysisId: string,
        public error: string,
        public statusCode: number,
        public successful: boolean,
        public data: string[]
    ) { }
}
