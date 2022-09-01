import { object } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import * as am4core from '@amcharts/amcharts4/core';

@Component({
    selector: 'app-ndhs-countries',
    templateUrl: './ndhs-countries.component.html',
    styleUrls: ['./ndhs-countries.component.css'],
})
export class NdhsCountriesComponent implements OnInit {
    countryId: any;
    currentYear: any;
    governanceId: any;
    ndhsDetails: any = [];
    object: any = object.keys;
    countryName: any;
    subscription: Subscription = new Subscription();
    Allcountry: any;
    flag: any;

    constructor(
        private apiService: CommonService,
        private utilityService: UtilitiesService
    ) {}

    ngOnInit(): void {
        this.apiService.getAllCountries().subscribe((countryData) => {
            this.Allcountry = countryData;
        });

        am4core.options.autoDispose = true;
        this.utilityService.header.next(true);
        this.subscription.add(
            this.utilityService.emitGovernance.subscribe((gId) => {
                this.governanceId = gId;
                this.ndhsDetails = [];
                this.getData();
            })
        );
    }

    getData() {
        this.flag = JSON.parse(
            localStorage.getItem('country_flag') || ''
        );
        this.countryName = JSON.parse(
            localStorage.getItem('country_name') || ''
        );
        this.countryId = JSON.parse(localStorage.getItem('country_id') || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governanceId = JSON.parse(
            localStorage.getItem('governance_id') || ''
        );
        this.subscription.add(
            this.apiService
                .getNdhsDetails(
                    this.governanceId,
                    this.countryId,
                    this.currentYear
                )
                .subscribe((data) => {
                    for (const key in data) {
                        this.ndhsDetails.push({ [key]: [data[key]] });
                    }
                })
        );
    }

    onSelectCountry(country:any) {
        this.flag = country.flag;
        this.countryName = country.country_name;
        localStorage.setItem('country_flag', JSON.stringify(country.flag));
        localStorage.setItem('country_id', country.country_id);
        localStorage.setItem('country_name', JSON.stringify(country.country_name));
        this.getData();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.utilityService.header.next(false);
    }
}
