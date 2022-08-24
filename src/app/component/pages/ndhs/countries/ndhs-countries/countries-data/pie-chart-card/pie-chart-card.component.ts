import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataModalComponent } from '../data-modal/data-modal.component';
import * as am4core from '@amcharts/amcharts4/core';
import { object } from '@amcharts/amcharts5';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
    selector: 'pie-chart-card',
    templateUrl: './pie-chart-card.component.html',
    styleUrls: ['./pie-chart-card.component.css'],
})
export class PieChartCardComponent implements OnInit, AfterViewInit {
    @Input() taxonomies: any;
    loading: boolean = true;
    object: any = object.keys;
    log: any = console.log;

    constructor(
        public dialog: MatDialog,
        private apiService: CommonService,
        private utilitiesService: UtilitiesService
    ) {}
    ngAfterViewInit(): void {
        if (this.taxonomies) {
            this.showMap();
        }
    }

    ngOnInit(): void {
        am4core.options.autoDispose = true;

        if (this.taxonomies && this.taxonomies.length) {
            this.loading = false;
        }
    }

    openViewData(
        governance_id: number,
        development_id: number,
        taxonomy_id: number
    ) {
        let country_id = JSON.parse(localStorage.getItem('country_id') || '');
        let currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.apiService
            .getTaxonomyViewData(
                governance_id,
                development_id,
                taxonomy_id,
                country_id,
                currentYear
            )
            .subscribe((data) => {
               this.utilitiesService.emitDataModel.next(data);
            });
            let dialogRef = this.dialog.open(DataModalComponent, {
                width: '80%',
                height: '90%',
            });
    }

    showMap() {
        for (const item of this.taxonomies) {
            for (const key in item) {
                let chartData: any = [];
                let id = item[key][0].taxonomy_id;
                let name = item[key][0].development_name;
                let chartToCreate = name + item[key][0].taxonomy_name + id;
                // console.log(chartToCreate);
                item[key].forEach((innerItem: any) => {
                    chartData.push({
                        country: innerItem.ultimate_name,
                        litres: innerItem.score,
                    });
                });
                let total = 200;
                chartData.push({
                    litres:
                        total - (+chartData[0].litres + +chartData[1].litres),
                });
                this.loadPieChart(chartToCreate, chartData);
            }
        }
    }

    loadPieChart(chartDiv: any, chartData: any) {
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create(
            'chartdiv_' + chartDiv,
            am4charts.PieChart3D
        );
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
        label.text =
            Math.round(
                ((+chartData[0].litres + +chartData[1].litres) / 200) * 100
            ).toString() + '%';

        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 22;
        label.fontWeight = 'normal';
        series.labels.template.maxWidth = 80;
        series.fontSize = 10;
        series.fontWeight = 'bold';
        series.labels.template.wrap = true;
        
        series.ticks.template.events.on('ready', hideSmall);
        series.ticks.template.events.on(
            'visibilitychanged',
            hideSmall
        );
        series.labels.template.events.on(
            'ready',
            hideSmall
        );
        series.labels.template.events.on(
            'visibilitychanged',
            hideSmall
        );
        series.labels.template.maxWidth = 70;
        series.labels.template.wrap = true;

        function hideSmall(ev: any) {
            if (
                ev.target.dataItem.hasProperties == false ||
                ev.target.dataItem.dataContext.percentage ==
                    0
            ) {
                ev.target.hide();
            } else {
                ev.target.show();
            }
        }

        series.labels.template.text = '{country}';
        // console.log(chart.data[2]);

        series.slices.template.tooltipText = '{category}';
        // console.log(series);
    }
}
