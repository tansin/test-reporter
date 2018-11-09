import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import {colors, symbols} from "../utils";

class PieChart extends Component {
  render() {
    const {uniqueTitle, dataTable} = this.props.data || {};

    const pieOptions = {
      title: uniqueTitle,
      slices: [
        {color: symbols.passed.bgColor},
        {color: symbols.failed.bgColor},
        {color: symbols.excluded.bgColor},
        // {color: symbols.pending.bgColor},
      ],
      titleTextStyle: {
        fontSize: 14,
        color: colors.black
      },
      legend: {
        textStyle: {
          color: colors.black,
          fontSize: 14
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 80,
        top: 50,
        width: '62%',
        height: '62%'
      },
      // fontName: 'Roboto',
      is3D: true,
      backgroundColor: colors.lightGray,
    };

    return (
      <Chart
        chartType='PieChart'
        data={dataTable}
        options={pieOptions}
        graph_id={uniqueTitle}
        width='100%'
        height='270px'
        legend_toggle
      />
    );
  }
}

export default PieChart;
