React component for NVD3 re-usable charting library

### Quick start

```javascript
<!DOCTYPE html>
<html>
<head>
  <title>BarChart</title>

  <!-- SCRIPTS -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.4/d3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
  <script type="text/jsx" src="/dist/react-nvd3.js"></script>

  <!-- STYLESHEETS -->
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.css">

  <style type="text/css">
    #barChart svg {
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="barChart"></div>
  <script type="text/jsx">
    ;(function(global){
      var datum = [{
          key: "Cumulative Return",
          values: [
            {
              "label" : "A" ,
              "value" : -29.765957771107
            } ,
            {
              "label" : "B" ,
              "value" : 0
            } ,
            {
              "label" : "C" ,
              "value" : 32.807804682612
            } ,
            {
              "label" : "D" ,
              "value" : 196.45946739256
            } ,
            {
              "label" : "E" ,
              "value" : 0.19434030906893
            } ,
            {
              "label" : "F" ,
              "value" : -98.079782601442
            } ,
            {
              "label" : "G" ,
              "value" : -13.925743130903
            } ,
            {
              "label" : "H" ,
              "value" : -5.1387322875705
            }
          ]
        }
      ];
      React.render(
        <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x="label" y="value"/>,
        document.getElementById('barChart')
      );
    })(window);

  </script>
</body>
</html>
```

### How to use

```javascript
<NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x="label" y="value"/>
```

#### Type (string):
Chart type you want to use. Posible values are:

* lineChart
* scatterChart
* stackedAreaChart
* discreteBarChart
* multiBarChart
* multiBarHorizontalChart
* linePlusBarChart
* cumulativeLineChart
* lineWithFocusChart
* pieChart
* bulletChart
* indentedTree

#### Datum (array|function):
A collection of data or a function that returns it.

#### x (string|function)
The key in the collection that should be used as x value or a function that returns it:

```javascript 
  function getX(d){
    return d.label;
  }
  React.render(
    <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x={getX} y="value"/>,
    document.getElementById('barChart')
  );  
```

#### y (string|function)
The key in the collection that should be used as y value or a function that returns it.

#### Available chart configurations
All the nvd3 configurations for each chart are available. For example if you are using the discreteBarChart then you could show values in this way:

```javascript
  React.render(
    <NVD3Chart id="barChart" type="discreteBarChart" showValues="true" datum={datum} x="x" y="value"/>,
    document.getElementById('barChart')
  );  
```

For more information about the available options you could check the nvd3 documentation http://nvd3.org/

NOTICE: An extensive documentation with examples is embeded in the repository https://github.com/novus/nvd3/blob/master/examples/documentation.html . If you want to check it just clone it and open that file.

### Do you want to load a chart from your database?
Since react allow you to use a plain javascript syntax to pass props then you could do this:

```javascript
var chart = { 
    id:'barChart', 
    type:'discreteBarChart', 
    datum: datum, 
    x: 'label', 
    y: 'value'
};

React.render(
    React.createElement('NVD3Chart', chart),
    document.getElementById('barChart')
);
```

Or this:

```javascript
// I've included jQuery here because I want to simplify the code, but it's not required.
$.getJSON('/mychartendpoint/1',function(chart){
    React.render(
        React.createElement('NVD3Chart', chart),
        document.getElementById('barChart')
    );
});
```
