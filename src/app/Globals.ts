import { Injectable } from '@angular/core';
import { UserMainInfoViewModel } from './models/UserMainInfoViewModel';

@Injectable()
export class Globals {
    userInfo: UserMainInfoViewModel;

}