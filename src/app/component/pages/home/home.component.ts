import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor() {}
    selectedYear:any = ['2021','2022'] 
    ngOnInit(): void {
        localStorage.setItem(
            'governance_id',
            JSON.stringify(1)
        );
        localStorage.setItem(
            'selected_country',
            '74,228'
        );
        localStorage.setItem(
            'country_id',
            "14"
        );
        localStorage.setItem(
            'country_flag',
            JSON.stringify("us.png")
            
        );
        localStorage.setItem(
            'country_name',
            JSON.stringify('Australia')
            
        );
        localStorage.setItem(
            'country_iso_code',
            JSON.stringify("US")

            
        );
        localStorage.setItem('year', '2021');
        localStorage.setItem('selected_years', JSON.stringify(this.selectedYear) );
    }
}
