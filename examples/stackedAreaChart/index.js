;(function(global){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      render(data);
    }
  };
  request.open('GET', '/examples/stackedAreaChart/data.json', true);
  request.send();

  function render(data) {
    ReactDOM.render(
      <NVD3Chart type="stackedAreaChart" xAxis={{ tickFormat: (d) => d3.time.format('%x')(new Date(d)) }} data={data} x={(d) => d[0]} y={(d) => d[1]} />,
      document.getElementById('barChart')
    );    
  }


})(window);
