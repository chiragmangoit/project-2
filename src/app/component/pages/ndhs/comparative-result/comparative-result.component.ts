import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { MainMapService } from 'src/app/services/main-map.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-comparative-result',
    templateUrl: './comparative-result.component.html',
    styleUrls: ['./comparative-result.component.css'],
})
export class ComparativeResultComponent implements OnInit, AfterViewInit {
    toppings = new FormControl();
    countriesToShow: any;
    countriesData: any;
    selectedYear: any = [];
    pointSeries: any;
    root: any;
    chart: any;
    countries_2021: any;
    countries_2022: any;
    selectedCountry: any = [];
    polygonSeries: any;
    mySelections: string[] = [];
    countrySelected: string | null | undefined;
    oldSelections: string[] = [];

    @ViewChild('mySelect') mySelect: ElementRef | any;

    constructor(
        private mapService: MainMapService,
        private utilityService: UtilitiesService,
        private apiService: CommonService
    ) {}

    ngAfterViewInit(): void {
        this.setMap();
    }

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
    }

    setMap() {
        // Create root
        this.root = am5.Root.new('chartdivcomp');

        // Set themes
        this.root.setThemes([am5themes_Animated.new(this.root)]);

        // Create chart
        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                panX: 'none',
                panY: 'none',
                wheelX: 'none',
                wheelY: 'none',
                projection: am5map.geoMercator(),
            })
        );

        this.polygonSeries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            })
        );

        this.polygonSeries.set('fill', am5.color(0xe6e6e6));
        this.polygonSeries.set('stroke', am5.color(0xffffff));

        this.polygonSeries.mapPolygons.template.setAll({
            templateField: 'polygonSettings',
            interactive: true,
            strokeWidth: 2,
        });

        // Create point series
        this.pointSeries = this.chart.series.push(
            am5map.MapPointSeries.new(this.root, {
                latitudeField: 'lat',
                longitudeField: 'long',
            })
        );

        this.pointSeries.bullets.push(() => {
            var circle = am5.Circle.new(this.root, {
                radius: 3,
                tooltipY: 0,
                fill: am5.color(0xff0000),
                strokeWidth: 0,
                strokeOpacity: 0,
                tooltipHTML: `
              <div style="width:130px;text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px; border-radius:1px;">
              <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
              <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
            `,
            });

            circle.states.create('hover', {
                radius: 4,
                scale: 2,
                strokeWidth: 3,
                strokeOpacity: 5,
                stroke: am5.color(0xff7b7b),
            });

            circle.events.on('click', (e: any) => {
                let country_id = e.target.dataItem?.dataContext.country_id;
                let country_flag = e.target.dataItem?.dataContext.flagImage;
                let country_iso_code = e.target.dataItem?.dataContext.iso_code;
                let year = e.target.dataItem.dataContext?.year;
                let country_name = e.target.dataItem?.dataContext.title;

                if (localStorage.getItem('country_id') != null) {
                    localStorage.removeItem('country_id');
                    localStorage.removeItem('country_flag');
                    localStorage.removeItem('country_iso_code');
                    localStorage.removeItem('year');
                    localStorage.removeItem('country_name');

                    localStorage.setItem(
                        'country_id',
                        JSON.stringify(country_id)
                    );
                    localStorage.setItem(
                        'country_flag',
                        JSON.stringify(country_flag)
                    );
                    localStorage.setItem(
                        'country_name',
                        JSON.stringify(country_name)
                    );
                    localStorage.setItem(
                        'country_iso_code',
                        JSON.stringify(country_iso_code)
                    );
                    localStorage.setItem('year', JSON.stringify(year));
                } else {
                    localStorage.setItem(
                        'country_id',
                        JSON.stringify(country_id)
                    );
                    localStorage.setItem(
                        'country_flag',
                        JSON.stringify(country_flag)
                    );
                    localStorage.setItem(
                        'country_name',
                        JSON.stringify(country_name)
                    );
                    localStorage.setItem(
                        'country_iso_code',
                        JSON.stringify(country_iso_code)
                    );
                    localStorage.setItem('year', JSON.stringify(year));
                }
                this.utilityService.header.next(true);
            });

            return am5.Bullet.new(this.root, {
                sprite: circle,
            });
        });
    }

    setCountry() {
        let countryData: any[] = [];
        this.selectedYear.forEach((year: string | number) => {
            let countryByYear = this.countriesData[year];
            countryByYear.forEach((data: any) => {
                this.selectedCountry.forEach((country: any) => {
                    if (country.country_id === data.id) {
                        if (this.mySelections.length <= 1) {
                            this.mySelections.push(country.country_id);
                            this.toppings.setValue(this.mySelections);
                        }
                        countryData.push({
                            long: data.lng,
                            lat: data.lat,
                            name: data.name,
                            title: data.name,
                            iso_code: data.iso_code,
                            flagImage: data.flag,
                            flag: '/assets/flags/' + data.flag,
                            country_id: data.id,
                            circleTemplate: data.bulletColors,
                            year: year,
                            id: data.iso_code,
                            polygonSettings: {
                                fill: am5.color(0x84abbd),
                            },
                        });
                    }
                });
            });
            this.polygonSeries.data.setAll(countryData);
            this.pointSeries.data.setAll(countryData);
        });
        this.oldSelections = this.mySelections;
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
                    // this.getComparativeData();
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
