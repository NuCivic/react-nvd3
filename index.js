import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';

let SETTINGS = ['x', 'y', 'width', 'height', 'type', 'datum'];

class Chart extends React.Component {
  static propTypes: {
    type: React.PropTypes.string.isRequired,
    configure: React.PropTypes.func
  }

  componentDidMount() {
    nv.addGraph(() => {
      this.chart = nv.models[this.props.type]()
        .x(this.getValueFunction(this.props.x, 'x'))
        .y(this.getValueFunction(this.props.y, 'y'))
        .margin(this.propsByPrefix('margin-') || {})
        .options(this.getChartOptions());

      !this.props.configure || this.props.configure(this.chart); // hook for configuring the chart

      d3.select(this.refs.svg).datum(this.props.datum).call(this.chart);

      nv.utils.windowResize(this.chart.update);
      return this.chart;
    });
  }

  componentDidUpdate() {
    !this.chart || d3.select(this.refs.svg).datum(this.props.datum).call(this.chart);
  }

  getChartOptions() {
    var options = this.props.chartOptions || {}; // hook for providing options
    Object.keys(this.props).forEach((prop) => {
      if (SETTINGS.indexOf(prop) < 0) options[prop] = this.props[prop];
    });
    return options;
  }

  propsByPrefix(prefix) {
    return Object.keys(this.props).reduce((memo, prop) => {
      if (prop.startsWith(prefix)) memo[prop.replace(prefix, '')] = this.props[prop];
      return memo;
    }, {});
  }

  getValueFunction(v, _default) {
    if(typeof v === 'function') return v;
    return (d) => { return typeof d[v] !== 'undefined' ? d[v] : d[_default]; }
  }

  render() {
    let opts = {};
    ['width', 'height'].forEach(x => { if (this.props[x]) opts[x] = this.props[x]; })
    return (
      <div ref="root" className="nv-chart">
        <svg ref="svg" {...opts}></svg>
      </div>
    );
  }
}

export default Chart;
