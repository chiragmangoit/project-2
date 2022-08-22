import { object } from '@amcharts/amcharts5';
import {Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
    selector: 'app-ndhs-countries',
    templateUrl: './ndhs-countries.component.html',
    styleUrls: ['./ndhs-countries.component.css'],
})
export class NdhsCountriesComponent {
    countryId: any;
    currentYear: any;
    governanceId: any;
    ndhsDetails: any = [];
    object: any = object.keys;
    log: any = console.log;
    countryName: any;
    subscription: Subscription = new Subscription();
    Allcountry: any;

    constructor(
        private apiService: CommonService,
        private utilityService: UtilitiesService
    ) {}

    ngOnInit(): void {
        this.apiService.getAllCountries().subscribe((countryData)=>{
            this.Allcountry = countryData;
        })

        am4core.options.autoDispose = true;
        this.utilityService.header.next(true);
        this.subscription.add(
            this.utilityService.emitGovernance.subscribe((gId) => {
                this.governanceId = gId;
                this.ndhsDetails = [];
                this.getData();
                setTimeout(() => {
                    for (const item of this.ndhsDetails) {
                        console.log(item[this.object(item)]);
                        for (const key in item[this.object(item)][0]) {
                            let chartData:any = [];
                            let id = item[this.object(item)][0][key][0].taxonomy_id;
                            let name  = item[this.object(item)][0][key][0].development_name;
                            let chartToCreate = name + item[this.object(item)][0][key][0].taxonomy_name + id ;
                            // console.log(chartToCreate);
                            item[this.object(item)][0][key].forEach((innerItem:any) => {
                                chartData.push({ 'country' : innerItem.ultimate_name, 'litres': innerItem.score }) 
                            });
                            let total = 200 ;
                            chartData.push({'litres': total - (+chartData[0].litres + +chartData[1].litres)})
                            this.loadPieChart(chartToCreate, chartData);
                        }
                     }
                }, 1000);
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
                .getNdhsDetails(
                    this.governanceId,
                    this.countryId,
                    this.currentYear
                )
                .subscribe((data) => {
                    for (const key in data) {
                        this.ndhsDetails.push({ [key]: data[key] });
                    }
                    this.log(this.ndhsDetails)
                })
        );
    }

    loadPieChart(chartDiv:any, chartData:any) {
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("chartdiv_" + chartDiv, am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        // chart.legend = new am4charts.Legend();

        chart.data = chartData;

        // chart.innerRadius = 100;
        chart.innerRadius = am4core.percent(50);

        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = 'litres';
        series.dataFields.category = 'country';

        series.colors.list = ['#008797', '#4DFFAE', '#DCDCDC'].map(function (
            color
        ) {
            return new (am4core.color as any)(color);
        });

        var label = series.createChild(am4core.Label);
        label.text = Math.round( ((+chartData[0].litres + +chartData[1].litres)/200) * 100).toString() + '%';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 25;

        series.labels.template.text = '{country}';
        // console.log(chart.data[2]);

        series.slices.template.tooltipText = '{category}';
        // console.log(series);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.utilityService.header.next(false);
    }
}
