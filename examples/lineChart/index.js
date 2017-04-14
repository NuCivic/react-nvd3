
;(function(global){
  function getData(j) {
    var sin = [],
        cos = [];

    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/j)});
      cos.push({x: i, y: .5 * Math.cos(i/j)});
    }

    return [
      {
        values: sin,
        key: 'Sine Wave',
        color: '#ff7f0e'
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      }
    ];
  }

  class LineWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 1
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({count: this.state.count + 1})
    }

    render() {
      const data = (this.state.count % 2 == 0)? getData(10): getData(11);
      return (
        <div>
        <button onClick={this.handleClick}>Change Data</button>
        {
          React.createElement(NVD3Chart, {
            xAxis: {
              tickFormat: function(d){ return d; },
              axisLabel: 'Period'
            },
            yAxis: {
              tickFormat: function(d) {return parseFloat(d).toFixed(2); }
            },
            xDomain: [-10, 120],
            type:'lineChart',
            data: data,
            x: 'label',
            y: 'value',
            duration: 1,
            margin: {
              left: 200
            },
            renderEnd: function(){
              console.log('renderEnd');
            }
          })
        }
        </div>
      )
    }
  };

  ReactDOM.render(
    <LineWrapper name="wrapper"/>,
    document.getElementById('lineChart')
  );

})(window);
