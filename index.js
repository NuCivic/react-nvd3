import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';
import {pick, without} from './utils.js'

let SETTINGS = ['x', 'y', 'width', 'height', 'type', 'datum', 'configure'];
let AXIS_NAMES = ['xAxis', 'yAxis','y1Axis', 'y2Axis','y3Axis' , 'y4Axis', 'x2Axis'];
let SIZE = ['width', 'height'];
let MARGIN = 'margin';

export default class NVD3Chart extends React.Component {
  static propTypes: {
    type: React.PropTypes.string.isRequired,
    configure: React.PropTypes.func
  }

  componentDidMount() {
    nv.addGraph(() => {

      // Margins are an special case. It needs to be
      // passed to the margin function.
      this.chart = nv.models[this.props.type]()
        .x(this.getValueFunction(this.props.x, 'x'))
        .y(this.getValueFunction(this.props.y, 'y'))
        .margin(this.options(MARGIN, pick).margin || this.propsByPrefix('margin') || {})
        .options(this.options(SETTINGS.concat(AXIS_NAMES, SIZE, MARGIN), without));

      // We need to set the axis options separatly
      this.setAxisOptions(this.chart, this.options(AXIS_NAMES));

      // hook for configuring the chart
      !this.props.configure || this.props.configure(this.chart);

      // Render chart using d3
      d3.select(this.refs.svg).datum(this.props.datum).call(this.chart);

      // Update the chart if the window size change.
      // TODO: review posible leak.
      nv.utils.windowResize(this.chart.update);
      return this.chart;
    });
  }

  /**
   * Configure axis options recursively
   * @param {nvd3 chart} chart  A nvd3 chart instance
   * @param {object} options    A key value object
   */
  setAxisOptions(chart, options) {
    for(let optionName in options){
      let optionValue = options[optionName];
      if(chart) {
        if(typeof optionValue === 'object' && !(optionValue instanceof Array)){
          this.setAxisOptions(chart[optionName], optionValue);
        } else if(typeof chart[optionName] === 'function'){
          chart[optionName](optionValue);
        }
      }
    }
  }

  /**
   * Update the chart after state is changed.
   */
  componentDidUpdate() {
    !this.chart || d3.select(this.refs.svg).datum(this.props.datum).call(this.chart);
  }

  /**
   * Filter options base on predicates
   * @param {Array} keys          An array of keys to preserve or remove
   * @param {Function} predicate  The function used to filter keys
   */
  options(keys, predicate) {
    if(this.props.chartOptions) console.warn('chartOptions is deprecated use options instead');
    // DEPRECATED: this.props.chartOptions
    let opt = this.props.options || this.props.chartOptions || this.props;
    predicate = predicate || pick;
    return predicate(opt, keys);
  }

  /**
   * Allow to use either a value or a function to
   * @param  {[type]} v        Either a getter or a function name
   * @param  {String} _default A default string used as getter
   * @return {Function}        Returns a function to use as getter
   */
  getValueFunction(v, _default) {
    if(typeof v === 'function') return v;
    return (d) => { return typeof d[v] !== 'undefined' ? d[v] : d[_default]; }
  }

  /**
   * Get properties using a prefix
   * @param  {String} prefix
   * @return {[type]} Return an object with wanted keys
   * DEPRECATED: This was created only for margins and
   * since we changed the api we don't need this anymore.
   */
  propsByPrefix(prefix) {
    console.warn('Set margin with prefixes is deprecated use an object instead');
    prefix = prefix + '-';
    return Object.keys(this.props).reduce((memo, prop) => {
      if (prop.startsWith(prefix)) memo[prop.replace(prefix, '')] = this.props[prop];
      return memo;
    }, {});
  }

  /**
   * Render function
   * svg element needs to have height and width.
   */
  render() {
    return (
      <div ref="root" className="nv-chart">
        <svg ref="svg" {...pick(this.props, SIZE)}></svg>
      </div>
    );
  }
}

// Babel 6 issue: http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
module.exports = NVD3Chart;
