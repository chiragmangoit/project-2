import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-inner',
    templateUrl: './header-inner.component.html',
    styleUrls: ['./header-inner.component.css'],
})
export class HeaderInnerComponent implements OnInit {
    showHeader = true;
    constructor(private router: Router) {}

    ngOnInit(): void {
        if (this.router.url === '/ndhs-map') {
            this.showHeader = false;
        }
    }
}
