
export class Result {

    constructor(
        public status: string,
        public analysisId: string,
        public error: string,
        public statusCode: number,
        public successful: boolean,
    ) { }
}



