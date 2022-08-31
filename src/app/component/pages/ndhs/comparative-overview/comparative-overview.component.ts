import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import data from 'src/assets/data/network.json';
import * as echarts from 'echarts';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

@Component({
    selector: 'app-comparative-overview',
    templateUrl: './comparative-overview.component.html',
    styleUrls: ['./comparative-overview.component.css'],
})
export class ComparativeOverviewComponent implements OnInit {
    chartOptionRadar: any;
    countryName: any;
    countryId: any;
    currentYear: any;
    governanceId: any;
    developmentId: any;
    taxonomyId: any;
    selectedYear: any;
    selectedCountries: any;
    availibilityScore: any;
    capacityScore: any;
    developmentScore: any;
    readinessScore: any;
    compareCountry: any = [];
    score: any;
    newScore: any = [];
    sort: any;
    chartOptionNode: any;
    thirty: any = [];
    sixty: any = [];
    eighty: any = [];
    hundred: any = [];
    toggle: any = true;
    object = Object.keys;
    barchartData: any;
    sortedTableData: any;
    tableScoreArray: any;
    governanceName: string = 'General Health';
    ultimateName: any = 'HealthCare Governance';
    developmentName: string = 'Present Development';
    ultimate: string = 'Availability ';

    @ViewChild('main') main: ElementRef | any;
    constructor(
        private common: CommonService,
        private utilityService: UtilitiesService,
        private cd: ChangeDetectorRef
    ) {}

    graph!: { categories: any[]; nodes: any; links: any };

    ngOnInit(): void {
        this.graph = data;

        this.tableScoreArray = [1, 2, 3, 4, 5];

        (this.selectedCountries = localStorage.getItem('selected_country')),
            console.log(this.selectedCountries);
        this.currentYear = JSON.parse(
            localStorage.getItem('selected_years') || ''
        );

        this.utilityService.emitNodeData.subscribe((value: any) => {
            let data = {
                countries: this.selectedCountries,
                developmentId: '1,2',
                governanceId: value.g_id,
                taxonomyId: value.t_id,
                year: this.currentYear,
            };
            let bubbleData = {
                developmentId: '1,2',
                governanceId: value.g_id,
                taxonomyId: value.t_id,
                ultimateId: value.u_id,
                year: this.currentYear,
            };

            let barData = {
                countries: this.selectedCountries,
                developmentId: value.d_id,
                governanceId: value.g_id,
                ultimateId: value.u_id,
                taxonomyId: value.t_id,
            };

            let tableChart = {
                countries: this.selectedCountries,
                developmentId: parseInt(value.d_id),
                governanceId: value.g_id,
                taxonomyId: value.t_id,
                ultimateId: value.u_id,
            };

            this.common.getTaxonomyTabledetails(tableChart).subscribe((val) => {
                // console.log(val);

                val.forEach((tableSort: any) => {
                    // console.log(tableSort);

                    this.sortedTableData = val.reduce(
                        (
                            group: { [x: string]: any[] },
                            product: { indicator_id: any }
                        ) => {
                            const { indicator_id } = product;
                            group[indicator_id] = group[indicator_id] ?? [];
                            group[indicator_id].push(product);
                            return group;
                        },
                        {}
                    );
                });
                // console.log(this.sortedTableData);

                // console.log(val);
                // val.forEach((element: any) => {
                //     console.log(element);
                // });
            });

            this.common.getOverviewBarChart(barData).subscribe((val) => {
                this.barchartData = [];
                val.forEach((element: any) => {
                    this.barchartData.push({
                        isoCode: element.iso_code,
                        percentage: element.percentage,
                    });
                });
                console.log(this.barchartData);

                // val.forEach((element: any) => {
                //     console.log(element);
                // });
            });

            // console.log(data);
            this.common.getOverviewRadarChart(data).subscribe((val) => {
                // console.log(val);
                // console.log(val);
                this.sort = val.reduce(
                    (
                        group: { [x: string]: any[] },
                        product: { country_name: any }
                    ) => {
                        const { country_name } = product;
                        group[country_name] = group[country_name] ?? [];
                        group[country_name].push(product);
                        return group;
                    },
                    {}
                );
                let keys = Object.keys(this.sort);
                this.newScore = [];
                this.radarChart(this.sort);
            });

            this.common.getOverviewBubbleChart(bubbleData).subscribe((bub) => {
                this.thirty = [];
                this.sixty = [];
                this.eighty = [];
                this.hundred = [];
                // console.log(bub);
                bub.forEach((bubData: any) => {
                    if (bubData.percentage <= 30) {
                        this.thirty.push({
                            name: bubData.iso_code,
                            value: 1,
                        });
                    } else if (
                        bubData.percentage <= 60 &&
                        bubData.percentage > 30
                    ) {
                        this.sixty.push({
                            name: bubData.iso_code,
                            value: 1,
                        });
                    } else if (
                        bubData.percentage <= 80 &&
                        bubData.percentage > 60
                    ) {
                        this.eighty.push({
                            name: bubData.iso_code,
                            value: 1,
                        });
                    } else if (
                        bubData.percentage <= 100 &&
                        bubData.percentage > 80
                    ) {
                        this.hundred.push({
                            name: bubData.iso_code,
                            value: 1,
                        });
                    }
                });
                this.bubbleChart();
            });
        });

        // this.BarChart();

        this.barChart();
    }

    ngAfterViewInit() {
        this.nodeChart();
        this.cd.detectChanges();
    }

    toggleCharts() {
        this.toggle = !this.toggle;
    }

    nodeChart() {
        let chartDom = this.main.nativeElement;
        let nodechart = echarts.init(chartDom);
        let option: any;

        this.graph.nodes.forEach(function (node: any) {
            node.label = {
                show: node.symbolSize > 30,
            };
        });
        option = {
            tooltip: {},
            legend: [
                {
                    // selectedMode: 'single',
                    data: this.graph.categories.map(function (a) {
                        return a.name;
                    }),
                },
            ],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            dataZoom: {
                start: 80,
                type: 'inside',
                disabled: true,
            },
            series: [
                {
                    name: '',
                    type: 'graph',
                    layout: 'none',
                    data: this.graph.nodes,
                    links: this.graph.links,
                    categories: this.graph.categories,
                    roam: true,
                    label: {
                        color: '#fff',
                        position: 'inside',
                        align: 'center',
                        formatter: '{b}',
                        verticalAlign: 'middle',
                        fontSize: '10',
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3,
                    },
                },
            ],
        };
        nodechart.setOption(option);

        nodechart.on('click', (e: any) => {
            if (e.borderColor == undefined) {
                console.log(e.data);
                if (e.data.category === 0) {
                    this.governanceName = 'Digital Health';
                    if (e.data.symbolSize === 10) {
                        this.ultimateName = e.data.name;
                    } else {
                        this.ultimateName = 'Digital Health Governance';
                    }
                } else {
                    this.governanceName = 'General Health';
                    if (e.data.symbolSize === 10) {
                        this.ultimateName = e.data.name;
                    } else {
                        this.ultimateName = 'HealthCare Governance';
                    }
                }
                if (e.data.d_id === 1) {
                    this.developmentName = 'Present Development';
                    if (e.data.u_id === 1) {
                        this.ultimate = 'Readiness';
                    } else {
                        this.ultimate = 'Availability';
                    }
                } else {
                    this.developmentName = 'Prospective Development';
                    if (e.data.u_id === 3) {
                        this.ultimate = 'Development Strategy';
                    } else {
                        this.ultimate = 'Capacity Building';
                    }
                }

                this.utilityService.emitNodeData.next(e.data);
            }
            this.radarChart(this.sort);
        });
    }

    barChart() {
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create('barGraph', am4charts.XYChart);
        chart.padding(0, 0, 0, 0);

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.disabled = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = 'network';
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = false;
        categoryAxis.renderer.grid.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = 'network';
        series.dataFields.valueX = 'MAU';
        series.tooltipText = '{valueX.value}';
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.horizontalCenter = 'left';
        labelBullet.label.dx = 10;

    //     var title2 = chart.titles.create();

    //     title2.html =
    //         `<div style="background: #000;
    //       color: #fff;
    //       width: 50px;
    //       height: 200px;
    //       text-align: center;
    //       border-radius: 15px 0px 0 15px;">
    //       <div style="transform: rotate(-90deg);
    //       position: absolute;
    //       left: -50px;
    //       top: 38%;">
    //       <label style="font-size: 12px;
    //       width: 150px;
    //       position: relative;
    //       top: 48%;
    //       height: 100%;
    //   display: inherit;">` +
    //        this.developmentName +
    //         `
    //           </label>
    //       <span style="font-size: 12px;"><b> ` +
    //         this.ultimate +
    //         `</b><span>
    //       <div>
    //       </div>`;
    //     title2.align = 'left';
    //     title2.rotation = 0;
    //     title2.marginBottom = -180;

    //     var title = chart.titles.create();
    //     // title.text = this.rangeB30[0].taxonomy_name;
    //     title.marginTop = 0;
    //     title.marginBottom = 30;
    //     title.marginLeft = 60;
    //     title.fontSize = 15;
    //     title.fontWeight = 'bold';
    //     title.align = 'center';

        setTimeout(() => {
            console.log(labelBullet.clones.values);
        }, 1000);
        labelBullet.label.html = `
        <div style="margin-bottom: -12px;margin-left: 30px;">{columnConfig.name}{columnConfig.per}</div>
        <div style="margin-bottom: 0px;">
        <img src="{columnConfig.img}" width="100">
        </div>
        `;
        labelBullet.label.paddingLeft = 160;
        labelBullet.label.paddingBottom = 50;

        labelBullet.locationX = 1;

        categoryAxis.sortBySeries = series;
        chart.data = [
            {
                network: 'Facebook',
                MAU: 30,
            },
            {
                network: 'Google+',
                MAU: 60,
            },
            {
                network: 'Instagram',
                MAU: 80,
            },
            {
                network: 'Pinterest',
                MAU: 100,
                columnConfig: {
                    name: 'UK',
                    per: '90%',
                    img: './assets/images/line.png',
                },
            },
        ];
    }

    radarChart(sort: any) {
        let keys = Object.keys(sort);
        keys.forEach((key) => {
            sort[key].forEach((element: any) => {
                this.compareCountry.push(element.country_name);
                if (element.ultimate_field == 'Readiness') {
                    this.readinessScore = element.percentage;
                } else if (element.ultimate_field == 'Availability') {
                    this.availibilityScore = element.percentage;
                } else if (element.ultimate_field == 'Capacity Building') {
                    this.capacityScore = element.percentage;
                } else if (element.ultimate_field == 'Development Strategy') {
                    this.developmentScore = element.percentage;
                }
            });

            this.score = [
                this.availibilityScore,
                this.capacityScore,
                this.developmentScore,
                this.readinessScore,
                // compareCountry: this.compareCountry,
            ];
            this.newScore.push(this.score);
        });
        // console.log(this.newScore);
        this.compareCountry = [...new Set(this.compareCountry)];
        this.chartOptionRadar = {
            title: {},
            legend: {
                data: this.compareCountry,
            },
            radar: {
                shape: 'circle',
                splitArea: {
                    areaStyle: {
                        color: ['#FFFAE3', '#F0EFEF'],
                        shadowColor: 'rgba(0, 0, 0, 0)',
                        shadowBlur: 10,
                    },
                },
                center: ['50%', '50%'],
                radius: 110,
                startAngle: 90,
                splitNumber: 5,
                axisName: {
                    color: '#707070',
                    fontSize: '10',
                },
                indicator: [
                    { text: 'Availability', max: 100 },
                    { text: 'Capacity Building', max: 100 },
                    { text: 'Development Strategy', max: 100 },
                    { text: 'Readiness', max: 100 },
                ],
            },
            series: [
                {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4,
                        },
                    },
                    data: [
                        {
                            value: this.newScore[1],
                            name: this.compareCountry[0],
                        },
                        {
                            value: this.newScore[0],
                            name: this.compareCountry[1],
                            areaStyle: {},
                        },
                    ],
                },
            ],
        };
    }

    bubbleChart() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(
            'bubble',
            am4plugins_forceDirected.ForceDirectedTree
        );

        var series = chart.series.push(
            new am4plugins_forceDirected.ForceDirectedSeries()
        );

        var title2 = chart.titles.create();

        title2.html =
            `<div style="background: #000;
          color: #fff;
          width: 50px;
          height: 200px;
          text-align: center;
          border-radius: 15px 0px 0 15px;">
          <div style="transform: rotate(-90deg);
          position: absolute;
          left: -50px;
          top: 38%;">
          <label style="font-size: 12px;
          width: 150px;
          position: relative;
          top: 48%;
          height: 100%;
      display: inherit;">` +
            this.developmentName +
            `
              </label>
          <span style="font-size: 12px;"><b> ` +
            this.ultimate +
            `</b><span>
          <div>
          </div>`;
        title2.align = 'left';
        title2.rotation = 0;
        title2.marginBottom = -180;

        var title = chart.titles.create();
        // title.text = this.rangeB30[0].taxonomy_name;
        title.marginTop = 0;
        title.marginBottom = 30;
        title.marginLeft = 60;
        title.fontSize = 15;
        title.fontWeight = 'bold';
        title.align = 'center';

        series.data = [
            {
                id: '1',
                name: '30%',
                value: 1,
                fixed: true,
                color: '#FA8E15',
                x: am4core.percent(40),
                y: am4core.percent(40),
                children: this.thirty,
            },
            {
                id: '2',
                name: '100%',
                color: '#00306C',
                fixed: true,
                value: 1,
                x: am4core.percent(50),
                y: am4core.percent(25),
                children: this.hundred,
            },
            {
                id: '3',
                name: '80%',
                color: '#4A92EC',
                fixed: true,
                value: 1,
                x: am4core.percent(50),
                y: am4core.percent(50),
                children: this.eighty,
            },
            {
                id: '4',
                name: '60%',
                color: '#4AEC9B',
                fixed: true,
                value: 1,
                x: am4core.percent(60),
                y: am4core.percent(40),
                children: this.sixty,
            },
            {
                id: '5',
                name: '',
                color: '#fff',
                fixed: true,
                value: 3,
                x: am4core.percent(550),
                y: am4core.percent(25),
            },
        ];

        series.dataFields.linkWith = 'linkWith';
        series.dataFields.name = 'name';
        series.dataFields.id = 'id';
        series.dataFields.value = 'value';
        series.dataFields.children = 'children';
        series.dataFields.fixed = 'fixed';
        series.dataFields.color = 'color';
        // networkSeries.nodes.template.width = 100;

        series.nodes.template.propertyFields.x = 'x';
        series.nodes.template.propertyFields.y = 'y';

        series.nodes.template.tooltipText = '{name}';
        series.nodes.template.fillOpacity = 1;

        series.nodes.template.label.text = '{name}';
        series.fontSize = 8;
        // networkSeries.maxLevels = 3;
        series.nodes.template.label.hideOversized = true;
        series.nodes.template.label.truncate = true;
        series.links.template.distance = 0;
        series.links.template.disabled = true;
        // series.nodes.template.interactionsEnabled = false;

        series.nodes.template.strokeWidth = 0;
        series.links.template.strokeOpacity = 0;
        series.nodes.template.label.fill = am4core.color('#fff');

        series.nodes.template.outerCircle.strokeOpacity = 0;
        series.nodes.template.outerCircle.fillOpacity = 0;
    }
}
