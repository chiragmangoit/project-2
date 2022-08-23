import {Component, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts/types/dist/echarts';

@Component({
    selector: 'app-comparative-overview',
    templateUrl: './comparative-overview.component.html',
    styleUrls: ['./comparative-overview.component.css'],
})
export class ComparativeOverviewComponent implements OnInit {


    chartOptionRadar: EChartsOption = {
        title: {

        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          shape: 'circle',
                splitArea: {
              areaStyle: {
                color: ['#FFFAE3', '#F0EFEF'],
                shadowColor: 'rgba(0, 0, 0, 0)',
                shadowBlur: 10
              }
            },
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
          ]
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
                areaStyle: {


                }
              }
            ]
          }
        ]
      };


    ngOnInit(): void {

    }

}
