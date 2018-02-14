
export class DBConnection {

    constructor(
        public dbUrl: string,
        public username: string,
        public password: number,
        public schemaName: string
    ) { }
}
