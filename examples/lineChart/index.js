
;(function(global){
  function getDatum() {
    var sin = [],
        cos = [];

    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      cos.push({x: i, y: .5 * Math.cos(i/10)});
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

  var datum = getDatum();

  ReactDOM.render(
    React.createElement(NVD3Chart, {
      xAxis: {
        tickFormat: function(d){ return d; },
        axisLabel: 'Period'
      },
      yAxis: {
        tickFormat: function(d) {return parseFloat(d).toFixed(2); }
      },
      type:'lineChart',
      datum: datum,
      x: 'label',
      y: 'value',
      margin: {
        left: 200
      },
      ready: function() { console.log('ready'); },
      renderStart: function() { console.log('renderStart'); },
      renderEnd: function() { console.log('renderEnd'); },
      postUpdate: function() { console.log('postUpdate'); }
    }),
    document.getElementById('lineChart')
  );


})(window);
