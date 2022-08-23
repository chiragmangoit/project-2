import { object } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-data-modal',
    templateUrl: './data-modal.component.html',
    styleUrls: ['./data-modal.component.css'],
})
export class DataModalComponent implements OnInit {
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
        this.subscription.add(
            this.utilityService.emitDataModel.subscribe((data) => {
                let key: any = object.keys(data);
                this.viewData = data[key];
                for (const key in this.viewData) {
                    this.ndhsDetails.push({ [key]: this.viewData[key] });
                }
                console.log( this.ndhsDetails);
                
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
