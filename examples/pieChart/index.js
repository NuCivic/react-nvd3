;(function(global){

var data1 = [
  {key: "One", y: 5, color: "#5F5"},
  {key: "Two", y: 2},
  {key: "Three", y: 9},
  {key: "Four", y: 7},
  {key: "Five", y: 4},
  {key: "Six", y: 3},
  {key: "Seven", y: 0.5}
];

var data2 = [
  {key: "Eight", y: 6},
  {key: "Nine", y: 2},
  {key: "Ten", y: 11},
];


var PieWrapper = React.createClass({
  getInitialState: function() {
    return { count: 1}
  },
  handleClick: function() {
    this.setState({count: this.state.count + 1})
  },
  render: function() {
    const data = (this.state.count % 2 == 0)? data1: data2;
    return (
      <div>
        <button onClick={this.handleClick}>Change Data</button>
        <NVD3Chart
          id="chart"
          width="100%"
          height="100%"
          type="pieChart"
          datum={data}
          x="key"
          y="y"
          renderEnd={function(chart, e){console.log( chart.id(), e)}}
          renderStart={function(chart, e){console.log( chart.id(), e)}}
          ready={function(chart, e){console.log( chart.id(), e)}}
        />
      </div>
    )
  }
})

ReactDOM.render(
  <PieWrapper name="wrapper" />,
  document.getElementById('pieChart')
);

})(window);