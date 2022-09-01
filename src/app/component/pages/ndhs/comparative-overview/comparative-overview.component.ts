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

import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';

@Component({
    selector: 'app-comparative-overview',
    templateUrl: './comparative-overview.component.html',
    styleUrls: ['./comparative-overview.component.css'],
})
export class ComparativeOverviewComponent implements OnInit {
    chartOptionRadar: any;
    currentYear: any;
    governanceId: any;
    developmentId: any;
    taxonomyId: any;
    selectedCountries: any;
    availibilityScore: any;
    capacityScore: any;
    developmentScore: any;
    readinessScore: any;
    compareCountry: any = [];
    score: any;
    newScore: any = [];
    sort: any;
    thirty: any = [];
    sixty: any = [];
    eighty: any = [];
    hundred: any = [];
    toggle: any = true;
    object: any = Object.keys;
    barchartData: any;
    sortedTableData: any = [];
    tableScoreArray: any;
    governanceName: string = 'General Health';
    ultimateName: any = 'HealthCare Governance';
    developmentName: string = 'Present Development';
    ultimate: string = 'Availability ';
    log: any = console.log;
    tableData: any = [];
    graph!: { categories: any[]; nodes: any; links: any };
    barchartData_new: any;

    @ViewChild('main') main: ElementRef | any;
    
    constructor(
        private common: CommonService,
        private utilityService: UtilitiesService,
        private cd: ChangeDetectorRef
    ) {}


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

            this.common.getOverviewRadarChart(data).subscribe((val) => {
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

            this.common.getTaxonomyTabledetails(tableChart).subscribe((val) => {
                this.tableData = [];
                this.sortedTableData = [];
                function myFunc(obj: any[], prop: string) {
                    return obj.reduce(function (acc, item) {
                        let key = item[prop];
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        if (prop == 'q_indicator_id') {
                            if (
                                acc[key].findIndex(
                                    (x: { q_indicator_id: any }) =>
                                        x.q_indicator_id === item.q_indicator_id
                                ) === -1
                            ) {
                                acc[key].push(item);
                            }
                        } else {
                            acc[key].push(item);
                        }
                        return acc;
                    }, {});
                }
                let sortByTaxonomy = myFunc(val, 'indicator_name');
                let keys = Object.keys(sortByTaxonomy);
                keys.forEach((element) => {
                    let sortByQuestion = myFunc(
                        sortByTaxonomy[element],
                        'question'
                    );
                    this.tableData.push({ [element]: sortByQuestion });
                    let score1 = 0;
                    let score2 = 0;
                    sortByTaxonomy[element].forEach((item: any) => {
                        if (item.c_name === this.compareCountry[0]) {
                            score1 +=
                                (item.actual_score / item.indicator_score) *
                                100;
                        } else {
                            score2 +=
                                (item.actual_score / item.indicator_score) *
                                100;
                        }
                    });
                    this.sortedTableData.push({
                        [element]: [score1 / 20, score2 / 20],
                    });
                });
            });

            this.common.getOverviewBarChart(barData).subscribe((val) => {
                this.barchartData = val;
                this.barchartData_new = [];
                let bar_data = {
                    text: val[0].country_name + ',' + val[1].country_name,
                    comIncome:
                        Math.round(val[0].percentage) + '%,' +  Math.round(val[1].percentage) + '%',
                    compText: val[0].country_name + ',' + val[1].country_name,
                    img: './assets/images/line.png',
                    per: Math.round(val[0].percentage),
                };
                
                if (val[0].percentage <= 25 && val[1].percentage <= 25) {
                    this.barchartData_new.push(bar_data);
                }
                if (
                    val[0].percentage > 25 &&
                    val[0].percentage <= 60 &&
                    val[1].percentage > 25 &&
                    val[1].percentage <= 60
                ) {
                    this.barchartData_new.push(bar_data);
                } else if (
                    val[0].percentage > 60 &&
                    val[0].percentage <= 80 &&
                    val[1].percentage > 60 &&
                    val[1].percentage <= 80
                ) {
                    this.barchartData_new.push(bar_data);
                } else if (
                    val[0].percentage > 80 &&
                    val[0].percentage <= 100 &&
                    val[1].percentage > 80 &&
                    val[1].percentage <= 100
                ) {
                    this.barchartData_new.push(bar_data);
                }
                
                this.BarChart();
            });

            this.common.getOverviewBubbleChart(bubbleData).subscribe((bub) => {
                this.thirty = [];
                this.sixty = [];
                this.eighty = [];
                this.hundred = [];
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
        this.BarChart();
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
            ];
            this.newScore.push(this.score);
        });
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

    BarChart() {
        if (this.barchartData) {
            //let root:any;
            am5.array.each(am5.registry.rootElements, function (root) {
                if (root && root.dom && root.dom.id == 'chartdiv2') {
                    root.dispose();
                }
            });
            let root = am5.Root.new('chartdiv2');
    
            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);
    
            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            let chart: any = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: 'none',
                    wheelY: 'none',
                })
            );
    
            let data = [
                {
                    year: '1',
                    income: 100,
                    columnConfig: {
                        fill: am5.color(0x00306c),
                    },
                },
                {
                    year: '2',
                    income: 75,
                    columnConfig: {
                        fill: am5.color(0x4a92ec),
                    },
                },
                {
                    year: '3',
                    income: 50,
                    columnConfig: {
                        fill: am5.color(0x4aec9b),
                    },
                },
                {
                    year: '4',
                    income: 25,
                    columnConfig: {
                        fill: am5.color(0xfa8e15),
                    },
                },
            ];
    
            if (this.barchartData_new.length == 1) {
                this.barchartData_new.forEach((element: any) => {
                    let bar_data_same = {
                        text: element.text,
                        comIncome: element.comIncome,
                        compText: element.compText,
                        img: './assets/images/line.png',
                    };
                    if (element.per <= 25) {
                        data[3] = { ...data[3], ...bar_data_same };
                    } else if (element.per <= 50) {
                        data[2] = { ...data[2], ...bar_data_same };
                    } else if (element.per <= 75) {
                        data[1] = { ...data[1], ...bar_data_same };
                    } else if (element.per <= 100) {
                        data[0] = { ...data[0], ...bar_data_same };
                    }
                });
            } else {
                this.barchartData.forEach((element: any) => {
                    let bar_data = {
                        text: element.country_name,
                        comIncome: element.percentage + '%',
                        compText: element.country_name,
                        img: './assets/images/line.png',
                    };
                    if (element.percentage <= 25) {
                        data[3] = { ...data[3], ...bar_data };
                    } else if (element.percentage <= 50) {
                        data[2] = { ...data[2], ...bar_data };
                    } else if (element.percentage <= 75) {
                        data[1] = { ...data[1], ...bar_data };
                    } else if (element.percentage <= 100) {
                        data[0] = { ...data[0], ...bar_data };
                    }
                });
            }
    
            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            let yAxis = chart.yAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: 'year',
                    renderer: am5xy.AxisRendererY.new(root, {
                        cellStartLocation: 0.2,
                        cellEndLocation: 0.9,
                        strokeOpacity: 1,
                        strokeWidth: 1,
                    }),
                })
            );
    
            //console.log(data);
            //console.log(data1)
    
            const myTheme = am5.Theme.new(root);
    
            myTheme.rule('Grid').setAll({
                visible: false,
            });
    
            root.setThemes([myTheme]);
    
            let yRenderer = yAxis.get('renderer');
            yRenderer.labels.template.setAll({
                visible: false,
            });
    
            yAxis.data.setAll(data);
    
            let xAxis = chart.xAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    numberFormat: "''",
                    renderer: am5xy.AxisRendererX.new(root, {
                        strokeOpacity: 1,
                        strokeWidth: 1,
                    }),
                })
            );
    
            let myRange = [
                {
                    x: 20,
                },
                {
                    x: 40,
                },
                {
                    x: 60,
                },
                {
                    x: 80,
                },
                {
                    x: 100,
                },
            ];
    
            for (var i = 0; i < data.length + 1; i++) {
                let value = myRange[i].x;
    
                let rangeDataItem = xAxis.makeDataItem({
                    value: value,
                });
    
                let range = xAxis.createAxisRange(rangeDataItem);
    
                rangeDataItem.get('label').setAll({
                    forceHidden: false,
                    text: value + '%',
                });
            }
    
            yAxis.children.moveValue(
                am5.Label.new(root, {
                    html:
                        `
                    <div style="background: #000;
                        color: #fff;
                        width: 50px;
                        height: 200px;
                        padding: 10px;
                        text-align: center;
                        border-radius: 15px 0px 0 15px;">
                        <div style="transform: rotate(-90deg);
                        position: absolute;
                        left: -50px;
                        top: 38%;">
                        <label style="font-size: 12px;
                        width: 150px;
                        position: relative;
                        top: 48%;">` +
                        this.barchartData[0].development_type +
                        `</label>
                    <span style="font-size: 12px;"><b>` +
                        this.barchartData[0].ultimate_field +
                        `</b><span>
                    <div>
                    </div>
                    `,
                }),
                0
            );
    
            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            let series1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: 'income',
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: 'income',
                    categoryYField: 'year',
                    sequencedInterpolation: true,
                })
            );
    
            series1.columns.template.setAll({
                height: am5.percent(70),
                templateField: 'columnConfig',
                strokeOpacity: 0,
            });
    
            series1.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationX: 0.8,
                    locationY: -0.5,
                    sprite: am5.Label.new(root, {
                        centerY: am5.p50,
                        html: `<div style="text-align:center;">
                      {comIncome} <br> {compText}<br>
                      <img src="{img}" width="120" style="margin-top:-17px;margin-left:-17px;">
                </div>`,
                    }),
                });
            });
    
            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            let cursor = chart.set(
                'cursor',
                am5xy.XYCursor.new(root, {
                    behavior: 'zoomY',
                })
            );
            cursor.lineX.set('visible', false);
            cursor.lineY.set('visible', false);
    
            series1.data.setAll(data);
    
            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series1.appear();
            chart.appear(1000, 100);
    
            chart.children.unshift(
                am5.Label.new(root, {
                    text: this.barchartData[0].taxonomy_name,
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'center',
                    x: am5.percent(40),
                    centerX: am5.percent(50),
                    paddingTop: -20,
                    paddingBottom: 10,
                    paddingLeft: 160,
                })
            );
        }
    }
}
