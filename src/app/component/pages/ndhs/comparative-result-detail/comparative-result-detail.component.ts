import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { EChartsOption } from 'echarts/types/dist/echarts';

@Component({
    selector: 'app-comparative-result-detail',
    templateUrl: './comparative-result-detail.component.html',
    styleUrls: ['./comparative-result-detail.component.css'],
})
export class ComparativeResultDetailComponent implements OnInit {
    ngOnInit(): void {
        // Create root and chart
        // Create root and chart
    }

    chartOptionBar: EChartsOption = {
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
