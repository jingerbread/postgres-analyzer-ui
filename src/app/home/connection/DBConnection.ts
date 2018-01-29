
export class DBConnection {

    constructor(
        public dbUrl: string,
        public schemaName: string,
        public user: string,
        public password: number
    ) { }
}
