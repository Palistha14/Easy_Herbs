import React, {Component} from 'react';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class ColumnLineChart extends Component {
    componentDidMount() {

        let data = []
        for (let key in this.props.checkIn){
            data.push({
                "month":key,
                "checkIn":this.props.checkIn[key],
                "checkOut":this.props.checkOut[key],
            })
        }
        data.pop()
        let item = data.pop()
        item["lineDash"]="5,5"
        data.push(item)
        data.push({
            "month": moment(Date.now()).format("MMM, YYYY"),
            "checkIn":this.props.eoq,
            "checkOut":this.props.avgDemand,
            "strokeWidth": 1,
            "columnDash": "5,5",
            "fillOpacity": 0.2,
            "additional": "(projection)"
        })
// Create chart instance
        let chart1 = am4core.create("chartdiv1", am4charts.XYChart);

// Export
        chart1.exporting.menu = new am4core.ExportMenu();

// Data for both series
//         let data = [ {
//             "year": "2009",
//             "income": 23.5,
//             "expenses": 21.1
//         }, {
//             "year": "2010",
//             "income": 26.2,
//             "expenses": 30.5
//         }, {
//             "year": "2011",
//             "income": 30.1,
//             "expenses": 34.9
//         }, {
//             "year": "2012",
//             "income": 29.5,
//             "expenses": 31.1
//         }, {
//             "year": "2013",
//             "income": 30.6,
//             "expenses": 28.2,
//             "lineDash": "5,5",
//         }, {
//             "year": "2014",
//             "income": 34.1,
//             "expenses": 32.9,
//             "strokeWidth": 1,
//             "columnDash": "5,5",
//             "fillOpacity": 0.2,
//             "additional": "(projection)"
//         } ];

        /* Create axes */
        let categoryAxis = chart1.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month";
        categoryAxis.renderer.minGridDistance = 30;

        /* Create value axis */
        let valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());

        /* Create series */
        let columnSeries = chart1.series.push(new am4charts.ColumnSeries());
        columnSeries.name = "Purchases";
        columnSeries.dataFields.valueY = "checkIn";
        columnSeries.dataFields.categoryX = "month";

        columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
        columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
        columnSeries.columns.template.propertyFields.stroke = "stroke";
        columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
        columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
        columnSeries.tooltip.label.textAlign = "middle";

        let lineSeries = chart1.series.push(new am4charts.LineSeries());
        lineSeries.name = "Sales";
        lineSeries.dataFields.valueY = "checkOut";
        lineSeries.dataFields.categoryX = "month";

        lineSeries.stroke = am4core.color("#fdd400");
        lineSeries.strokeWidth = 3;
        lineSeries.propertyFields.strokeDasharray = "lineDash";
        lineSeries.tooltip.label.textAlign = "middle";

        let bullet = lineSeries.bullets.push(new am4charts.Bullet());
        bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
        bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
        let circle = bullet.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#fff");
        circle.strokeWidth = 3;

        chart1.data = data;
    }

    render() {
        return (
            <div className={'center'}>
                <div id="chartdiv1" style={{ width: "700px", height:"300px" }}></div>
            </div>
        );
    }
}

export default ColumnLineChart;