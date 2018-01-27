//
//
// import {BackendConfig} from "../data-backend/backend.config";
// import {Backends} from "../data-backend/backend";
// import {RequestMethod} from "@angular/http";
// export const reportMenusConfig = (deps) => (<BackendConfig>{
//     backend: Backends.Rest,
//     REST: {
//         baseUrl: `${deps.DPA_API_URL}ui/reportmenu/header?page=1&pagesize=100&query=menuType%3Dobject`,
//         requestBuilder: {
//             fetch: (url) => ({url, method: RequestMethod.Get}),
//         },
//
//         errorHandler: deps.baseErrorHandler,
//         headersFactory: deps.baseHeaderFactory,
//         mapper:  deps.xmlMapper,
//
//     }
// });


export class Result {

    constructor(
        public status: String,
        public analysisId: String,
        public statusCode: number,
        public successful: boolean,
    ) { }
}



