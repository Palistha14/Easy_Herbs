import React, {Component} from 'react';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class DonutChart extends Component {

    componentDidMount() {
// Create chart instance
        let chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
        chart.data = [{
            "country": "Sold",
            "litres": this.props.sells
        }, {
            "country": "Current Stock",
            "litres": this.props.curStock
        }, {
            "country": "Purchased",
            "litres": this.props.purchase
        }, {
            "country": "Previous Stock",
            "litres": this.props.preStock
        }];

// Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.innerRadius = am4core.percent(50);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;

        let rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
    }

    render() {
        return (
            <div className={'center'}>
                <div id="chartdiv" style={{ width: "300px", height:"450px" }}></div>
            </div>
        );
    }
}

export default DonutChart;