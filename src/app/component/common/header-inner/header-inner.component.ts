import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-header-inner',
    templateUrl: './header-inner.component.html',
    styleUrls: ['./header-inner.component.css'],
})
export class HeaderInnerComponent implements OnInit {
    showHeader = true;
    value: any;
    constructor(private router: Router, private utilityService:UtilitiesService) {}

    ngOnInit(): void {
        this.value = JSON.parse(localStorage.getItem('governance_id') || '');
        if (this.router.url === '/ndhs-map') {
            this.showHeader = false;
        }
    }

    setGovernance(value: any) {
        this.value = value;
        localStorage.setItem('governance_id', JSON.stringify(value));
        this.utilityService.emitGovernance.next(value);
    }
}
