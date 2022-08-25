import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MainMapService } from 'src/app/services/main-map.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-comparative-result-detail',
    templateUrl: './comparative-result-detail.component.html',
    styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent implements OnInit {
    countryId: any;
    currentYear: any;
    governanceId: any;
    ndhsDetails: any;
    viewData: any;
    countryName: any;
    chartOptionBar: EChartsOption = {};
    toppings = new FormControl();
    countriesToShow: any;
    countriesData: any;
    selectedYear: any = [];
    countries_2021: any;
    countries_2022: any;
    selectedCountry: any = [];
    polygonSeries: any;
    mySelections: string[] = [];
    countrySelected: string | null | undefined;
    oldSelections: string[] = [];
    object: any = Object.keys;
    log: any = console.log;
    subscription: Subscription = new Subscription();

    @ViewChild('mySelect') mySelect: ElementRef | any;

    constructor(
        private mapService: MainMapService,
        private utilityService: UtilitiesService,
        private apiService: CommonService
    ) {}

    ngOnInit(): void {
        this.apiService
            .getAllCountries()
            .subscribe((data) => (this.countriesToShow = data));
        this.countrySelected = localStorage.getItem('selected_country');
        this.selectedYear = JSON.parse(
            localStorage.getItem('selected_years') || ''
        );
        this.utilityService.emitDefaultCountries.subscribe((defaultCountry) => {
            this.apiService
                .getdefaultCountry(defaultCountry)
                .subscribe((data) => {
                    this.selectedCountry = data;
                    if (this.countriesData) {
                        this.setCountry();
                    }
                    this.getData();
                });
        });
        //getting countries data
        this.mapService.getCountries().subscribe((data) => {
            let country = data;
            this.countries_2021 = country['2021'];
            this.countries_2022 = country['2022'];
            this.countries_2022.map((data: any) => {
                return (data.bulletColors = { fill: am5.color(0xff0000) });
            });
            this.countries_2021 &&
                this.countries_2021.map((data: any) => {
                    return (data.bulletColors = { fill: am5.color(0x7589ff) });
                });
            this.countriesData = {
                ...{ '2021': this.countries_2021 },
                ...{ '2022': this.countries_2022 },
            };
            this.setCountry();
        });

        this.utilityService.header.next(true);
        this.subscription.add(
            this.utilityService.emitGovernance.subscribe((gId) => {
                this.governanceId = gId;
                this.ndhsDetails = [];
                this.getData();
            })
        );

        this.showBarChart();
    }

    getData() {
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governanceId = JSON.parse(
            localStorage.getItem('governance_id') || ''
        );
        
        let data = {
            countries: this.countrySelected,
            governances: this.governanceId,
            year: this.currentYear,
        };

        this.subscription.add(
            this.apiService.getComparativeOverview(data).subscribe((data) => {
                this.ndhsDetails = data;
                this.log(data);
                let key: any = Object.keys(data);
               key.forEach((element:any) => {
                   for (const key in data[element]) {
                    this.log(key)
                    //    this.ndhsDetails.push({ [key]: this.viewData[key] });
                   }
               });
                
            })
        );
    }

    setCountry() {
        this.selectedYear.forEach((year: string | number) => {
            let countryByYear = this.countriesData[year];
            countryByYear.forEach((data: any) => {
                this.selectedCountry.forEach((country: any) => {
                    if (country.country_id === data.id) {
                        if (this.mySelections.length <= 1) {
                            this.mySelections.push(country.country_id);
                            this.toppings.setValue(this.mySelections);
                        }
                    }
                });
            });
        });
        this.oldSelections = this.mySelections;
    }

    showBarChart() {
        this.chartOptionBar = {
            title: {
                text: 'Health Governance',
            },
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['Readiness'],
                    ['Japan', 60],
                    ['Australia', 80],
                    ['India', 50],
                    ['China', 60],
                    ['Spain', 60],
                ],
            },
            xAxis: {
                type: 'category',
                axisLabel: { interval: 0, rotate: 30 },
            },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }],
        };
    }

    handlePrint() {
        window.print();
    }

    changed() {
        let temp = this.mySelections.filter((obj) => {
            return this.oldSelections.indexOf(obj) == -1;
        });
        if (this.toppings.value.length < 3) {
            this.mySelections = this.toppings.value;

            if (this.mySelections.length == 2) {
                this.countrySelected = this.mySelections.toString();
                localStorage.removeItem('selected_country');
                localStorage.setItem('selected_country', this.countrySelected);
                this.mySelect.close();
            }
        } else {
            if (this.toppings.value.length == 3) {
                let index = this.toppings.value.indexOf(temp[0]);
                if (index == 0) {
                    this.toppings.value.pop();
                } else {
                    this.toppings.value.shift();
                }
                this.mySelections = this.toppings.value;
                this.oldSelections = this.mySelections;
                if (this.mySelections.length == 2) {
                    this.countrySelected = this.mySelections.toString();
                    let defaultCountry = {
                        countries: this.countrySelected,
                    };
                    this.utilityService.emitDefaultCountries.next(
                        defaultCountry
                    );
                    localStorage.removeItem('selected_country');
                    localStorage.setItem(
                        'selected_country',
                        this.countrySelected
                    );
                    this.mySelect.close();
                }
            }
            this.toppings.setValue(this.mySelections);
        }
    }
}
