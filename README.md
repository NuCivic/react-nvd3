React component for NVD3 re-usable charting library

## Requirements
* NVD3
* D3
* ReactJS

## Quick start

```javascript
<!DOCTYPE html>
<html>
<head>
  <title>BarChart</title>

  <!-- SCRIPTS -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.4/d3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.1/nv.d3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-with-addons.min.js"></script>
  <!-- You should remove this for production and provide a compiled version of react components -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
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
  <script type="text/babel">
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

## How do I add this to my project?
* Using bower and running `bower install react-nvd3`
* Using npm and running `npm install react-nvd3`
* Downloading it manually by clicking [here to download minified version](https://raw.githubusercontent.com/NuCivic/react-nvd3/master/dist/react-nvd3.min.js)

## How to use

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

#### margin (object)
To set chart margins you should provide an object with the wanted margins. For example 

```javascript 
  React.render(
    <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} margin={{left:200}}/>,
    document.getElementById('barChart')
  );  
```


### Events 

#### ready (function)
A function to be called right after the first transition ends. This event is triggered only once.

#### renderStart (function)
A function to be called each time the chart rendering starts.

#### renderEnd (function)
A function to be called each time the chart transition ends.

```javascript 
  React.render(
    <NVD3Chart 
      type="discreteBarChart" 
      datum={datum} 
      renderEnd={mycallbackEnd}
      renderStart={mycallbackStart}
      ready={mycallbackReady} />,
    document.getElementById('barChart')
  );  
```

#### Available chart configurations
All the nvd3 configurations for each chart are available. For example if you are using the discreteBarChart then you could show values in this way:

```javascript
  React.render(
    <NVD3Chart id="barChart" type="discreteBarChart" showValues="true" datum={datum} x="x" y="value"/>,
    document.getElementById('barChart')
  );  
```

For more information about the available options you could check the nvd3 documentation http://nvd3.org/

**NOTICE:** An extensive documentation with examples is embeded in the repository https://github.com/novus/nvd3/blob/master/examples/documentation.html . If you want to check it just clone it and open that file.

#### Configure nested nvd3 components
If you need to configure nested nvd3 components you need to pass a nested object with the configurations to the property that match with the nested component.

Suppose you need to disable tooltips in your charts:

```javascript
  React.render(
    <NVD3Chart tooltip={{enabled: true}} id="barChart" type="discreteBarChart" showValues="true" datum={datum} x="x" y="value"/>,
    document.getElementById('barChart')
  );
```

In this case we are passing the nested object to configure the tooltip. This is also applicable to axis components.

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

#### Ok, but what about axis formatters and other functions?
Formatters are functions and we don't want to stored them in a database. If you want to persist your chart state somewhere you need to have a plain json object. 

Instead of persist your function implementations in your json you need to create a reference from the json object and pass those functions by context at the moment you instantiate the chart. 

Suppose you have a function called getColor to assign the colors in your charts. In this case you'll need to create a context object with the getColor function implementation inside and pass the reference to the color property.

Function references have this format: ```{name:'functionNameInContext', type:'function'}```.

Let's see an example:

```javascript
var context = {
  getColor: function(i){
    var colors = d3.scale.category20().range().slice(10);
    return colors[Math.floor(Math.random() * colors.length)];    
  }
};

ReactDOM.render(
<NVD3Chart context={context} color={{name:'getColor', type:'function'}} type="discreteBarChart" datum={datum} x="label" y="value" />,
document.getElementById('barChart')
);
```

## Developers
Source code is pretty straightforward. You can take a look at https://github.com/NuCivic/react-nvd3/blob/master/index.js.

#### Requirements
* nodejs
* webpack
* gulp

#### Quick start
* git clone https://github.com/NuCivic/react-nvd3.git
* cd react-nvd3
* npm install
* gulp serve
* open any example http://localhost:3000/examples/barChart/



