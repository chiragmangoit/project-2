import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    defaultCountry = {
        countries: localStorage.getItem('selected_country'),
    };
    constructor() {}
    emitGovernance = new BehaviorSubject<any>(1);
    header = new BehaviorSubject<boolean>(false);
    emitDefaultCountries = new BehaviorSubject<any>(this.defaultCountry);
    emitDataModel = new Subject<any>()
}
