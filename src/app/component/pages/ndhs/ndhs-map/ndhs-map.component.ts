import { Component, OnInit } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { MainMapService } from 'src/app/services/main-map.service';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'app-ndhs-map',
    templateUrl: './ndhs-map.component.html',
    styleUrls: ['./ndhs-map.component.css'],
})
export class NdhsMapComponent implements OnInit {
    countriesToShow: any;
    countriesData: any;
    selectedYear: any = ['2021'];
    pointSeries: any;
    root: any;
    chart: any;
    countries_2021: any;
    countries_2022: any;
    constructor(
        private router: Router,
        private mapService: MainMapService,
        private utilityService: UtilitiesService
    ) {}

    ngOnInit(): void {
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
        });

        // Create root
        this.root = am5.Root.new('chartdiv');

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

        // Create polygon series
        var polygonSeries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            })
        );

        polygonSeries.set('fill', am5.color(0xe6e6e6));
        polygonSeries.set('stroke', am5.color(0xffffff));

        polygonSeries.mapPolygons.template.setAll({
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
                templateField: 'circleTemplate',
                radius: 3,
                tooltipHTML: `
              <div style="text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px;width:99px;">
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
                this.redirectToNdhsMap();
            });

            return am5.Bullet.new(this.root, {
                sprite: circle,
            });
        });

        setTimeout(() => {
            this.setCountry();
        }, 2000);
    }

    setCountry() {
        let countryData: any[] = [];
        this.selectedYear.forEach((year: string | number) => {
            let countryByYear = this.countriesData[year];
            countryByYear.forEach((data: any) => {
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
                });
            });
            this.pointSeries.data.setAll(countryData);
        });
    }

    onSelectYear(year: string) {
        if (!this.selectedYear.includes(year)) {
            this.selectedYear.push(year);
            this.setCountry();
            return true;
        } else {
            if (this.selectedYear.length > 1) {
                this.selectedYear = this.selectedYear.filter(
                    (item: string) => item !== year
                );
                this.setCountry();
                return true;
            } else {
                return false;
            }
        }
    }

    redirectToNdhsMap() {
        this.router.navigate(['ndhs-countries']);
    }
}
