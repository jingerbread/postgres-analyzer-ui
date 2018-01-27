import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";

@Injectable()
export class HomeService {

    constructor(private messageService: MessageService) { }

    getMessage() {
        this.messageService.add('Yes');
    }

}
