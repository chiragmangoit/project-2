import { object } from '@amcharts/amcharts5';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-prospective-development',
    templateUrl: './prospective-development.component.html',
    styleUrls: ['./prospective-development.component.css'],
})
export class ProspectiveDevelopmentComponent implements OnInit, OnDestroy {
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
        let dataInput = {
            countries: this.countryId,
            development_id: 2,
            governanceId: this.governanceId,
        };
        this.subscription.add(
            this.apiService
                .getComparativeOverview(dataInput)
                .subscribe((data) => {
                    let key: any = object.keys(data);
                    this.viewData = data[key];
                    for (const key in this.viewData) {
                        this.ndhsDetails.push({ [key]: this.viewData[key] });
                    }
                })
        );
    }

    handlePrint() {
        window.print();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.utilityService.header.next(false);
    }
}
