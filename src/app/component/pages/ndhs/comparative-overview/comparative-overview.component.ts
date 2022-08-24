import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts/types/dist/echarts';
import * as $ from 'jquery';
import data from 'src/assets/data/network.json';
import * as echarts from 'echarts';
import { Location } from '@angular/common';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';

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
    graph = {
        nodes: [
            {
                id: '0',
                name: 'Digital Health',
                g_id: 2,
                d_id: 1,
                u_id: 2,
                t_id: 6,
                symbolSize: 30,
                x: 186.44687,
                y: -13.805411,
                category: 0,
            },
            {
                id: '1',
                name: 'Health & It',
                g_id: 1,
                d_id: 1,
                u_id: 2,
                t_id: 1,
                symbolSize: 30,
                x: -40.93029,
                y: -100.8120565,
                category: 1,
            },
            {
                id: '01',
                name: 'Prospective',
                d_id: 2,
                g_id: 2,
                u_id: 4,
                t_id: 6,
                symbolSize: 20,
                x: 230.42786,
                y: 150.44803,
                category: 0,
            },
            {
                id: '010',
                name: 'Digital Health (DH) Governance',
                t_id: 6,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 420.42786,
                y: 250.44803,
                category: 0,
            },
            {
                id: '011',
                name: 'DH Infrastructure',
                t_id: 7,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 480.42786,
                y: 250.44803,
                category: 0,
            },
            {
                id: '012',
                name: 'Workforce (Technical and Health care)',
                t_id: 8,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 540.42786,
                y: 300.44803,
                category: 0,
            },
            {
                id: '013',
                name: 'Funding and resources',
                t_id: 9,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 480.42786,
                y: 350.44803,
                category: 0,
            },
            {
                id: '014',
                name: 'Legal rules',
                t_id: 10,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 420.42786,
                y: 350.44803,
                category: 0,
            },
            {
                id: '015',
                name: 'Research Program and funding',
                t_id: 11,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 380.42786,
                y: 300.44803,
                category: 0,
            },
            {
                id: '016',
                name: 'Literacy (patient+ workforce)',
                t_id: 12,
                g_id: 2,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: 450.42786,
                y: 300.44803,
                category: 0,
            },
            {
                id: 'LP2',
                name: 'Capacity Building',
                u_id: 4,
                d_id: 2,
                g_id: 2,
                t_id: 6,
                symbolSize: 10,
                x: 150.42786,
                y: 220.44803,
                category: 0,
            },
            {
                id: 'LP1',
                name: 'Development Strategy',
                u_id: 3,
                d_id: 2,
                g_id: 2,
                t_id: 6,
                symbolSize: 10,
                x: 350.42786,
                y: 200.44803,
                category: 0,
            },
            {
                id: '017',
                name: 'Digital Health (DH) Governance',
                t_id: 6,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 150.42786,
                y: 300.44803,
                category: 0,
            },
            {
                id: '018',
                name: 'DH Infrastructure',
                t_id: 7,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 80.42786,
                y: 300.44803,
                category: 0,
            },
            {
                id: '019',
                name: 'Workforce (Technical and Health care)',
                t_id: 8,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 150.42786,
                y: 400.44803,
                category: 0,
            },
            {
                id: '020',
                name: 'Funding and resources',
                t_id: 9,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 80.42786,
                y: 400.44803,
                category: 0,
            },
            {
                id: '021',
                name: 'Legal rules',
                t_id: 10,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 110.42786,
                y: 350.44803,
                category: 0,
            },
            {
                id: '022',
                name: 'Research Program and funding',
                t_id: 11,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 200.42786,
                y: 350.44803,
                category: 0,
            },
            {
                id: '023',
                name: 'Literacy (patient+ workforce)',
                t_id: 12,
                g_id: 2,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: 20.42786,
                y: 350.44803,
                category: 0,
            },
            {
                id: '02',
                name: 'Present',
                d_id: 1,
                g_id: 2,
                u_id: 2,
                t_id: 6,
                symbolSize: 20,
                x: 385.6842,
                y: 20.206686,
                category: 0,
            },
            {
                id: '02P1',
                name: 'Digital Health (DH) Governance',
                t_id: 6,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 370.42786,
                y: -330.44803,
                category: 0,
            },
            {
                id: '02P2',
                name: 'DH Infrastructure',
                t_id: 7,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 300.42786,
                y: -330.44803,
                category: 0,
            },
            {
                id: '02P3',
                name: 'Workforce (Technical and Health care)',
                t_id: 8,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 450.42786,
                y: -330.44803,
                category: 0,
            },
            {
                id: '02P4',
                name: 'Funding and resources',
                t_id: 9,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 320.42786,
                y: -390.44803,
                category: 0,
            },
            {
                id: '02P5',
                name: 'Legal rules',
                t_id: 10,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 410.42786,
                y: -390.44803,
                category: 0,
            },
            {
                id: '02P6',
                name: 'Research Program and funding',
                t_id: 11,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 380.42786,
                y: -270.44803,
                category: 0,
            },
            {
                id: '02P7',
                name: 'Literacy (patient+ workforce)',
                t_id: 12,
                g_id: 2,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: 440.42786,
                y: -270.44803,
                category: 0,
            },
            {
                id: '02L1',
                name: 'Readiness',
                u_id: 1,
                d_id: 1,
                g_id: 2,
                t_id: 6,
                symbolSize: 10,
                x: 380.42786,
                y: -130.44803,
                category: 0,
            },
            {
                id: '02L2',
                name: 'Availability',
                u_id: 2,
                d_id: 1,
                g_id: 2,
                t_id: 6,
                symbolSize: 10,
                x: 490.42786,
                y: -20.44803,
                category: 0,
            },
            {
                id: '02P8',
                name: 'Digital Health (DH) Governance',
                t_id: 6,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 660.42786,
                y: -70.44803,
                category: 0,
            },
            {
                id: '02P9',
                name: 'DH Infrastructure',
                t_id: 7,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 590.42786,
                y: -70.44803,
                category: 0,
            },
            {
                id: '02P10',
                name: 'Workforce (Technical and Health care)',
                t_id: 8,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 740.42786,
                y: -70.44803,
                category: 0,
            },
            {
                id: '02P11',
                name: 'Funding and resources',
                t_id: 9,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 630.42786,
                y: -130.44803,
                category: 0,
            },
            {
                id: '02P12',
                name: 'Legal rules',
                t_id: 10,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 690.42786,
                y: -130.44803,
                category: 0,
            },
            {
                id: '02P13',
                name: 'Research Program and funding',
                t_id: 11,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 630.42786,
                y: -10.44803,
                category: 0,
            },
            {
                id: '02P14',
                name: 'Literacy (patient+ workforce)',
                t_id: 12,
                g_id: 2,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: 690.42786,
                y: -10.44803,
                category: 0,
            },
            {
                id: '11',
                name: 'Present',
                d_id: 1,
                g_id: 1,
                u_id: 2,
                t_id: 1,
                symbolSize: 20,
                x: -200.42786,
                y: -180.44803,
                category: 1,
            },
            {
                id: '12',
                name: 'Prospective',
                d_id: 2,
                g_id: 1,
                u_id: 3,
                t_id: 1,
                symbolSize: 20,
                x: -185.6842,
                y: 100.206686,
                category: 1,
            },
            {
                id: '110',
                name: 'Readiness ',
                u_id: 1,
                d_id: 1,
                g_id: 1,
                t_id: 1,
                symbolSize: 10,
                x: -300.42786,
                y: -250.44803,
                category: 1,
            },
            {
                id: '1P1',
                name: 'Development Strategy',
                u_id: 3,
                d_id: 2,
                g_id: 1,
                t_id: 1,
                symbolSize: 10,
                x: -250.42786,
                y: 10.44803,
                category: 1,
            },
            {
                id: '1P2',
                name: 'Capacity Building',
                u_id: 4,
                d_id: 2,
                g_id: 1,
                t_id: 1,
                symbolSize: 10,
                x: -260.42786,
                y: 220.44803,
                category: 1,
            },
            {
                id: '111',
                name: 'Availability',
                u_id: 2,
                d_id: 1,
                g_id: 1,
                t_id: 1,
                symbolSize: 10,
                x: -120.42786,
                y: -250.44803,
                category: 1,
            },
            {
                id: '1100',
                name: 'AI Workforce/Infrastructure',
                t_id: 5,
                g_id: 1,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: -355.2226,
                y: -343.5572,
                category: 1,
            },
            {
                id: '1101',
                name: 'IT Governance',
                t_id: 2,
                g_id: 1,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: -356.55884,
                y: -303.98975,
                category: 1,
            },
            {
                id: '1102',
                name: 'IT Workforce & Infrastructure ',
                t_id: 3,
                g_id: 1,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: -350.79382,
                y: -393.57944,
                category: 1,
            },
            {
                id: '1103',
                name: 'Healthcare Governance',
                t_id: 1,
                g_id: 1,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: -400.1624,
                y: -336.9891,
                category: 1,
            },
            {
                id: '1104',
                name: 'Healthcare workforce and Infrastructure',
                t_id: 4,
                g_id: 1,
                d_id: 1,
                u_id: 1,
                symbolSize: 7,
                x: -308.12122,
                y: -364.5048,
                category: 1,
            },
            {
                id: '1110',
                name: 'AI Workforce/Infrastructure',
                t_id: 5,
                g_id: 1,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: -155.2226,
                y: -343.5572,
                category: 1,
            },
            {
                id: '1111',
                name: 'Healthcare Governance',
                t_id: 1,
                g_id: 1,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: -106.55884,
                y: -303.98975,
                category: 1,
            },
            {
                id: '1112',
                name: 'Healthcare workforce and Infrastructure',
                t_id: 4,
                g_id: 1,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: -125.79382,
                y: -393.57944,
                category: 1,
            },
            {
                id: '1113',
                name: 'IT Workforce & Infrastructure ',
                t_id: 3,
                g_id: 1,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: -108.1624,
                y: -346.9891,
                category: 1,
            },
            {
                id: '1114',
                name: 'IT Governance',
                t_id: 2,
                g_id: 1,
                d_id: 1,
                u_id: 2,
                symbolSize: 7,
                x: -58.12122,
                y: -364.5048,
                category: 1,
            },
            {
                id: '1P00',
                name: 'IT Workforce & Infrastructure ',
                t_id: 3,
                g_id: 1,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: -340.2226,
                y: 343.5572,
                category: 1,
            },
            {
                id: '1P01',
                name: 'IT Governance',
                t_id: 2,
                g_id: 1,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: -356.55884,
                y: 303.98975,
                category: 1,
            },
            {
                id: '1P02',
                name: 'Healthcare workforce and Infrastructure',
                t_id: 4,
                g_id: 1,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: -330.79382,
                y: 373.57944,
                category: 1,
            },
            {
                id: '1P03',
                name: 'Healthcare Governance',
                t_id: 1,
                g_id: 1,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: -380.1624,
                y: 356.9891,
                category: 1,
            },
            {
                id: '1P04',
                name: 'AI Workforce/Infrastructure',
                t_id: 5,
                g_id: 1,
                d_id: 2,
                u_id: 4,
                symbolSize: 7,
                x: -308.12122,
                y: 324.5048,
                category: 1,
            },
            {
                id: '1PP0',
                name: 'IT Workforce & Infrastructure ',
                t_id: 3,
                g_id: 1,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: -355.2226,
                y: -43.5572,
                category: 1,
            },
            {
                id: '1PP1',
                name: 'IT Governance',
                t_id: 2,
                g_id: 1,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: -356.55884,
                y: -0.98975,
                category: 1,
            },
            {
                id: '1PP2',
                name: 'Healthcare workforce and Infrastructure',
                t_id: 4,
                g_id: 1,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: -350.79382,
                y: -93.57944,
                category: 1,
            },
            {
                id: '1PP3',
                name: 'Healthcare Governance',
                t_id: 1,
                g_id: 1,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: -400.1624,
                y: -50.9891,
                category: 1,
            },
            {
                id: '1PP4',
                name: 'AI Workforce/Infrastructure',
                t_id: 5,
                g_id: 1,
                d_id: 2,
                u_id: 3,
                symbolSize: 7,
                x: -308.12122,
                y: -64.5048,
                category: 1,
            },
        ],
        links: [
            {
                source: '1',
                target: '0',
            },
            {
                source: '01',
                target: '1',
            },
            {
                source: '1',
                target: '02',
            },
            {
                source: '0',
                target: '02',
            },
            {
                source: '02',
                target: '0',
            },
            {
                source: '01',
                target: '0',
            },
            {
                source: '02',
                target: '01',
            },
            {
                source: '12',
                target: '1P2',
            },
            {
                source: '1P1',
                target: '12',
            },
            {
                source: '1',
                target: '1P1',
            },
            {
                source: '1',
                target: '12',
            },
            {
                source: '1',
                target: '11',
            },
            {
                source: '11',
                target: '1',
            },
            {
                source: '010',
                target: 'LP1',
            },
            {
                source: 'LP1',
                target: '011',
            },
            {
                source: 'LP1',
                target: '012',
            },
            {
                source: '015',
                target: 'LP1',
            },
            {
                source: '014',
                target: 'LP1',
            },
            {
                source: '013',
                target: 'LP1',
            },
            {
                source: '011',
                target: '010',
            },
            {
                source: '010',
                target: '015',
            },
            {
                source: '014',
                target: '015',
            },
            {
                source: '013',
                target: '014',
            },
            {
                source: '012',
                target: '013',
            },
            {
                source: '011',
                target: '012',
            },
            {
                source: '016',
                target: 'LP1',
            },
            {
                source: '01',
                target: 'LP1',
            },
            {
                source: '016',
                target: '010',
            },
            {
                source: '011',
                target: '013',
            },
            {
                source: '011',
                target: '016',
            },
            {
                source: '017',
                target: '021',
            },
            {
                source: '018',
                target: '021',
            },
            {
                source: '019',
                target: '021',
            },
            {
                source: '020',
                target: '021',
            },
            {
                source: '022',
                target: '021',
            },
            {
                source: '023',
                target: '021',
            },
            {
                source: '018',
                target: '023',
            },
            {
                source: '017',
                target: '018',
            },
            {
                source: '022',
                target: '017',
            },
            {
                source: '019',
                target: '022',
            },
            {
                source: '020',
                target: '019',
            },
            {
                source: '023',
                target: '020',
            },
            {
                source: '023',
                target: 'LP2',
            },
            {
                source: '018',
                target: '020',
            },
            {
                source: 'LP2',
                target: '017',
            },
            {
                source: 'LP2',
                target: '022',
            },
            {
                source: 'LP2',
                target: '019',
            },
            {
                source: '018',
                target: 'LP2',
            },
            {
                source: 'LP2',
                target: '01',
            },
            {
                source: '023',
                target: 'LP2',
            },
            {
                source: '017',
                target: '0',
            },
            {
                source: '021',
                target: '0',
            },
            {
                source: '018',
                target: '0',
            },
            {
                source: '02P2',
                target: '02P1',
            },
            {
                source: '02P1',
                target: '02P3',
            },
            {
                source: '02P4',
                target: '02P7',
            },
            {
                source: '02P2',
                target: '02P4',
            },
            {
                source: '02P4',
                target: '02P5',
            },
            {
                source: '02P5',
                target: '02P3',
            },
            {
                source: '02P3',
                target: '02P7',
            },
            {
                source: '02P3',
                target: '02P7',
            },
            {
                source: '02P7',
                target: '02P6',
            },
            {
                source: '02P6',
                target: '02P2',
            },
            {
                source: '02L1',
                target: '02P1',
            },
            {
                source: '02L1',
                target: '02P2',
            },
            {
                source: '02',
                target: '02L1',
            },
            {
                source: '02P3',
                target: '02L1',
            },
            {
                source: '02L1',
                target: '02P4',
            },
            {
                source: '02P5',
                target: '02L1',
            },
            {
                source: '02P6',
                target: '02L1',
            },
            {
                source: '0',
                target: '02P6',
            },
            {
                source: '02P8',
                target: '02P12',
            },
            {
                source: '02P8',
                target: '02P13',
            },
            {
                source: '02P9',
                target: '02P14',
            },
            {
                source: '02P10',
                target: '02P11',
            },
            {
                source: '02P7',
                target: '02L1',
            },
            {
                source: '02P1',
                target: '0',
            },
            {
                source: '02P6',
                target: '0',
            },
            {
                source: '02P2',
                target: '0',
            },
            {
                source: '02P11',
                target: '02P12',
            },
            {
                source: '02P12',
                target: '02P10',
            },
            {
                source: '02P10',
                target: '02P14',
            },
            {
                source: '02P14',
                target: '02P13',
            },
            {
                source: '02P9',
                target: '02P11',
            },
            {
                source: '02P13',
                target: '02P9',
            },
            {
                source: '0',
                target: '02P9',
            },
            {
                source: '0',
                target: '02P13',
            },
            {
                source: '02P14',
                target: '02L2',
            },
            {
                source: '02P8',
                target: '02L2',
            },
            {
                source: '02L2',
                target: '02P9',
            },
            {
                source: '02P13',
                target: '02L2',
            },
            {
                source: '02L2',
                target: '02P11',
            },
            {
                source: '02P2',
                target: '02P5',
            },
            {
                source: '02L2',
                target: '02',
            },
            {
                source: '111',
                target: '11',
            },
            {
                source: '1',
                target: '111',
            },
            {
                source: '111',
                target: '1',
            },
            {
                source: '1',
                target: '110',
            },
            {
                source: '11',
                target: '110',
            },
            {
                source: '1100',
                target: '110',
            },
            {
                source: '110',
                target: '1101',
            },
            {
                source: '1102',
                target: '110',
            },
            {
                source: '110',
                target: '1103',
            },
            {
                source: '1104',
                target: '110',
            },
            {
                source: '1104',
                target: '1101',
            },
            {
                source: '1101',
                target: '1103',
            },
            {
                source: '1103',
                target: '1102',
            },
            {
                source: '1102',
                target: '1104',
            },
            {
                source: '1103',
                target: '1100',
            },
            {
                source: '1100',
                target: '1103',
            },
            {
                source: '1102',
                target: '1100',
            },
            {
                source: '1',
                target: '1101',
            },
            {
                source: '1',
                target: '1103',
            },
            {
                source: '1113',
                target: '1110',
            },
            {
                source: '1113',
                target: '1111',
            },
            {
                source: '1113',
                target: '1112',
            },
            {
                source: '1113',
                target: '1114',
            },
            {
                source: '1114',
                target: '1111',
            },
            {
                source: '1111',
                target: '1110',
            },
            {
                source: '1112',
                target: '1110',
            },
            {
                source: '1112',
                target: '1114',
            },
            {
                source: '111',
                target: '1113',
            },
            {
                source: '1114',
                target: '1',
            },
            {
                source: '1111',
                target: '1',
            },
            {
                source: '1114',
                target: '111',
            },
            {
                source: '1111',
                target: '111',
            },
            {
                source: '111',
                target: '1110',
            },
            {
                source: '111',
                target: '1112',
            },
            {
                source: '1P04',
                target: '1P02',
            },
            {
                source: '1P02',
                target: '1P03',
            },
            {
                source: '1P01',
                target: '1P03',
            },
            {
                source: '1P04',
                target: '1P01',
            },
            {
                source: '1P00',
                target: '1P01',
            },
            {
                source: '1P00',
                target: '1P02',
            },
            {
                source: '1P00',
                target: '1P03',
            },
            {
                source: '1P00',
                target: '1P04',
            },
            {
                source: '1P00',
                target: '1P2',
            },
            {
                source: '1P2',
                target: '1P01',
            },
            {
                source: '1P2',
                target: '1P02',
            },
            {
                source: '1P03',
                target: '1P2',
            },
            {
                source: '1P2',
                target: '1P04',
            },
            {
                source: '1P1',
                target: '1PP0',
            },
            {
                source: '1P1',
                target: '1PP1',
            },
            {
                source: '1PP2',
                target: '1P1',
            },
            {
                source: '1P1',
                target: '1PP3',
            },
            {
                source: '1PP4',
                target: '1P1',
            },
            {
                source: '1PP4',
                target: '1PP1',
            },
            {
                source: '1PP1',
                target: '1PP3',
            },
            {
                source: '1PP4',
                target: '1PP2',
            },
            {
                source: '1PP2',
                target: '1PP3',
            },
            {
                source: '1PP0',
                target: '1PP1',
            },
            {
                source: '1PP0',
                target: '1PP2',
            },
            {
                source: '1PP0',
                target: '1PP3',
            },
            {
                source: '1PP0',
                target: '1PP4',
            },
        ],
        categories: [
            {
                name: 'Digital Health',
            },
            {
                name: 'Health & It',
            },
        ],
    };

    chartOptionNode: EChartsOption = {
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
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
                data: this.graph.nodes,
                links: this.graph.links,
                categories: this.graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}',
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3,
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 1,
                    },
                },
            },
        ],
    };

    bubble = {
        type: 'force',
        categories: [
            {
                name: 'HTMLElement',
                keyword: {},
                base: 'HTMLElement',
            },
            {
                name: 'WebGL',
                keyword: {},
                base: 'WebGLRenderingContext',
            },
            {
                name: 'SVG',
                keyword: {},
                base: 'SVGElement',
            },
            {
                name: 'CSS',
                keyword: {},
                base: 'CSSRule',
            },
            {
                name: 'Other',
                keyword: {},
            },
        ],
        nodes: [
            {
                name: 'AnalyserNode',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioNode',
                value: 1,
                category: 4,
            },
            {
                name: 'Uint8Array',
                value: 1,
                category: 4,
            },
            {
                name: 'Float32Array',
                value: 1,
                category: 4,
            },
            {
                name: 'ArrayBuffer',
                value: 1,
                category: 4,
            },
            {
                name: 'ArrayBufferView',
                value: 1,
                category: 4,
            },
            {
                name: 'Attr',
                value: 1,
                category: 4,
            },
            {
                name: 'Node',
                value: 1,
                category: 4,
            },
            {
                name: 'Element',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioBuffer',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioBufferCallback',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioBufferSourceNode',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioSourceNode',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioGain',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioParam',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioContext',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioDestinationNode',
                value: 1,
                category: 4,
            },
            {
                name: 'AudioListener',
                value: 1,
                category: 4,
            },
            {
                name: 'BiquadFilterNode',
                value: 1,
                category: 4,
            },
            {
                name: 'ChannelMergerNode',
                value: 1,
                category: 4,
            },
            {
                name: 'ChannelSplitterNode',
                value: 1,
                category: 4,
            },
            {
                name: 'ConvolverNode',
                value: 1,
                category: 4,
            },
            {
                name: 'DelayNode',
                value: 1,
                category: 4,
            },
            {
                name: 'DynamicsCompressorNode',
                value: 1,
                category: 4,
            },
            {
                name: 'GainNode',
                value: 1,
                category: 4,
            },
            {
                name: 'MediaElementAudioSourceNode',
                value: 1,
                category: 4,
            },
            {
                name: 'MediaStreamAudioDestinationNode',
                value: 1,
                category: 4,
            },
            {
                name: 'MediaStreamAudioSourceNode',
                value: 1,
                category: 4,
            },
            {
                name: 'OscillatorNode',
                value: 1,
                category: 4,
            },
        ],
        links: [
            {
                source: 0,
                target: 1,
            },
            {
                source: 0,
                target: 2,
            },
            {
                source: 0,
                target: 3,
            },
            {
                source: 4,
                target: 4,
            },
            {
                source: 5,
                target: 4,
            },
            {
                source: 6,
                target: 7,
            },
            {
                source: 6,
                target: 8,
            },
            {
                source: 9,
                target: 3,
            },
            {
                source: 10,
                target: 9,
            },
            {
                source: 11,
                target: 12,
            },
            {
                source: 11,
                target: 9,
            },
            {
                source: 11,
                target: 13,
            },
            {
                source: 11,
                target: 14,
            },
            {
                source: 15,
                target: 16,
            },
            {
                source: 15,
                target: 17,
            },
            {
                source: 15,
                target: 0,
            },
            {
                source: 15,
                target: 18,
            },
            {
                source: 15,
                target: 9,
            },
            {
                source: 15,
                target: 11,
            },
            {
                source: 15,
                target: 19,
            },
            {
                source: 15,
                target: 20,
            },
            {
                source: 15,
                target: 21,
            },
            {
                source: 15,
                target: 22,
            },
            {
                source: 15,
                target: 23,
            },
            {
                source: 15,
                target: 24,
            },
            {
                source: 15,
                target: 25,
            },
            {
                source: 15,
                target: 26,
            },
            {
                source: 15,
                target: 27,
            },
            {
                source: 15,
                target: 28,
            },
            {
                source: 15,
                target: 29,
            },
            {
                source: 15,
                target: 30,
            },
            {
                source: 15,
                target: 31,
            },
            {
                source: 15,
                target: 32,
            },
            {
                source: 15,
                target: 4,
            },
            {
                source: 16,
                target: 1,
            },
            {
                source: 13,
                target: 14,
            },
            {
                source: 1,
                target: 15,
            },
            {
                source: 1,
                target: 1,
            },
            {
                source: 1,
                target: 14,
            },
            {
                source: 14,
                target: 3,
            },
            {
                source: 12,
                target: 1,
            },
            {
                source: 18,
                target: 1,
            },
            {
                source: 18,
                target: 14,
            },
            {
                source: 18,
                target: 3,
            },
            {
                source: 33,
                target: 34,
            },
            {
                source: 35,
                target: 33,
            },
            {
                source: 35,
                target: 36,
            },
            {
                source: 35,
                target: 37,
            },
            {
                source: 35,
                target: 38,
            },
            {
                source: 35,
                target: 39,
            },
        ],
    };
    bubblechart: EChartsOption = {
            legend: {
                data: ['HTMLElement', 'WebGL', 'SVG', 'Other'],
                icon: 'circle',
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    animation: false,
                    label: {
                        position: 'right',
                        formatter: '{b}',
                    },
                    draggable: true,
                    data: this.bubble.nodes.map(function (
                        node: any,
                        idx: number
                    ) {
                        node.id = idx;
                        return node;
                    }),
                    categories: this.bubble.categories,
                    force: {
                        edgeLength: 5,
                        repulsion: 90,
                        gravity: 0.8,
                    },
                },
            ],
    };



    bar: EChartsOption = {
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [80, 80, 'Matcha Latte'],
                [20, 20, 'Milk Tea'],
                [50, 50, 'Cheese Cocoa'],
                [30, 30, 'Cheese Brownie'],
            ],
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
          visualMap: {
    // orient: 'horizontal',
    top: 'center',
    min: 10,
    max: 100,
    // text: ['High Score', 'Low Score'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F']
    }
  },
        emphasis: {
            disabled: true,
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product',
                },
            },
        ],
    };





    countryName: any;
    countryId: any;
    currentYear: any;
    governanceId: any;
    developmentId: any;



    radarChart(){
        this.countryName = JSON.parse(
            localStorage.getItem('country_name') || ''
        );
        this.developmentId = JSON.parse(localStorage.getItem('developmentId') || '');
        this.countryId = JSON.parse(localStorage.getItem('country_id') || '');
        this.currentYear = JSON.parse(localStorage.getItem('year') || '');
        this.governanceId = JSON.parse(
            localStorage.getItem('governance_id') || ''
        );
        let years  = JSON.parse(localStorage.getItem("selected_years") || '');


    }




    chartOptionRadar: EChartsOption = {
        title: {},
        legend: {
            data: ['Allocated Budget', 'Actual Spending'],
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
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
            ],
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 9000, 20000, 32000, 50000, 180000],
                        name: 'Allocated Budget',
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending',
                        areaStyle: {},
                    },
                ],
            },
        ],
    };

    ngOnInit(): void {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(
          "chartdiv",
          am4plugins_forceDirected.ForceDirectedTree
        );

        var series = chart.series.push(
          new am4plugins_forceDirected.ForceDirectedSeries()
        );

        series.data = [
          {
            id: "1",
            name: "25%",
            value: 2,
            fixed: true,
            color: "#FA8E15",
            x: am4core.percent(40),
            y: am4core.percent(40),
            children: [{
              name: 'Stale', value: 1
            }, {
              name: 'Cardboard', value: 1
            }, {
              name: 'Papery', value: 1
            }, {
              name: 'Woody', value: 1
            }, {
              name: 'Moldy/Damp', value: 1
            }, {
              name: 'Musty/Dusty', value: 1
            }, {
              name: 'Musty/Earthy', value: 1
            }, {
              name: 'Rubber', value: 1
            }]
          },
          {
            id: "2",
            name: "100%",
            color: "#00306C",
            fixed: true,
            value: 2,
            x: am4core.percent(50),
            y: am4core.percent(25),
            children: [{
              name: 'Stale', value: 1
            }, {
              name: 'Cardboard', value: 1
            }, {
              name: 'Papery', value: 1
            }, {
              name: 'Woody', value: 1
            }, {
              name: 'Moldy/Damp', value: 1
            }, {
              name: 'Musty/Dusty', value: 1
            }, {
              name: 'Musty/Earthy', value: 1
            }, {
              name: 'Rubber', value: 1
            }]
          },
          {
            id: "3",
            name: "80%",
            color: "#4A92EC",
            fixed: true,
            value: 2,
            x: am4core.percent(50),
            y: am4core.percent(50),
            children: [
              {
                name: "Stale",
                value: 1
              },
              {
                name: "Cardboard",
                value: 1
              },
              {
                name: "Papery",
                value: 1
              },
              {
                name: "Woody",
                value: 1
              },
              {
                name: "Moldy/Damp",
                value: 1
              },
              {
                name: "Musty/Dusty",
                value: 1
              },
              {
                name: "Musty/Earthy",
                value: 1
              },
              {
                name: "Rubber",
                value: 1
              }
            ]
          },
          {
            id: "4",
            name: "60%",
            color: "#4AEC9B",
            fixed: true,
            value: 2,
            x: am4core.percent(60),
            y: am4core.percent(40),
            children: [{
              name: 'Stale', value: 1
            }, {
              name: 'Cardboard', value: 1
            }, {
              name: 'Papery', value: 1
            }, {
              name: 'Woody', value: 1
            }, {
              name: 'Moldy/Damp', value: 1
            }, {
              name: 'Musty/Dusty', value: 1
            }, {
              name: 'Musty/Earthy', value: 1
            }, {
              name: 'Rubber', value: 1
            }]
          },
          {
            name: "",
            fixed: true,
            value: 1,
            x: am4core.percent(150),
            y: am4core.percent(40),
            children: [
              {
                name: "",
                value: 4
              }
            ]
          }
        ];



        series.dataFields.linkWith = "linkWith";
        series.dataFields.name = "name";
        series.dataFields.id = "name";
        series.dataFields.value = "value";
        series.dataFields.children = "children";
        series.dataFields.fixed = "fixed";

        series.nodes.template.propertyFields.x = "x";
        series.nodes.template.propertyFields.y = "y";

        series.nodes.template.tooltipText = "{name}";
        series.nodes.template.fillOpacity = 1;

        series.nodes.template.label.text = "{name}"
        series.fontSize = 8;
        series.maxLevels = 2;
        series.nodes.template.label.hideOversized = true;
        series.nodes.template.label.truncate = false;






        let years  = JSON.parse(localStorage.getItem("selected_years") || '');
        console.log(years);

        this.developmentId = JSON.parse(localStorage.getItem('developmentId') || '');
        console.log(this.developmentId)
    }
}
