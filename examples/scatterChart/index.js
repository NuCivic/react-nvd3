;(function(global){
  function randomData(groups, points) { //# groups,# points per group
          // smiley and thin-x are our custom symbols!
          var data = [],
              shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
              random = d3.random.normal();
          for (var i = 0; i < groups; i++) {
              data.push({
                  key: 'Group ' + i,
                  values: []
              });
              for (var j = 0; j < points; j++) {
                  data[i].values.push({
                      x: random(),
                      y: random(),
                      size: Math.round(Math.random() * 100) / 100,
                      shape: shapes[j % shapes.length]
                  });
              }
          }
          return data;
      }

  var Main = React.createClass({
    getInitialState: function() {
      return { data: randomData(4, 40) };
    },
    handleClick: function() {
      this.setState({ data: randomData(4, 40) });
    },
    render: function() {
      return (
        <div>
          <button onClick={this.handleClick}>
            Use New Data
          </button>
          <NVD3Chart
            type="scatterChart"
            datum={this.state.data}
            containerStyle={{ width: "500px", height: "500px" }}
            options={{ showDistX: true, showDistY: true }}
          />
        </div>
      );
    }
  });

  ReactDOM.render(
    <Main />,
    document.getElementById('scatterChart')
  );


})(window);
