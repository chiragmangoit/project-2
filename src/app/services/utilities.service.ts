import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UtilitiesService {
    defaultNodeData = {
        d_id: '1,2',
        g_id: localStorage.getItem('governance_id'),
        t_id: 1,
        u_id: 2,
        countries: localStorage.getItem('selected_country'),
        year: '2022,2021',
    };

    defaultCountry = {
        countries: localStorage.getItem('selected_country'),
    };
    constructor() {}
    emitGovernance = new BehaviorSubject<any>(1);
    header = new BehaviorSubject<boolean>(false);
    emitDefaultCountries = new BehaviorSubject<any>(this.defaultCountry);
    emitDataModel = new Subject<any>();
    emitNodeData = new BehaviorSubject<any>(this.defaultNodeData);
}
