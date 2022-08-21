import { object } from '@amcharts/amcharts5';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-present-development',
    templateUrl: './present-development.component.html',
    styleUrls: ['./present-development.component.css'],
})
export class PresentDevelopmentComponent implements OnInit, OnDestroy {
    countryId: any;
    currentYear: any;
    governanceId: any;
    ndhsDetails: any = [];
    viewData: any;
    object: any = object.keys;
    log: any = console.log;
    countryName: any;
    subscription: Subscription = new Subscription();

    constructor(
        private apiService: CommonService,
        private utilityService: UtilitiesService
    ) {}

    ngOnInit(): void {
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
                .getViewData(
                    this.governanceId,
                    1,
                    this.countryId,
                    this.currentYear
                )
                .subscribe((data) => {
                    let key: any = object.keys(data);
                    this.viewData = data[key];
                    for (const key in this.viewData) {
                        this.ndhsDetails.push({ [key]: this.viewData[key] });
                    }
                    //    console.log(this.object(this.viewData['Availability']));

                    console.log(this.ndhsDetails);
                })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.utilityService.header.next(false);
    }
}
