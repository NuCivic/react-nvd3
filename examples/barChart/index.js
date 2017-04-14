;(function(global){
  var data = [{
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

  // Unmounting example
  class Chart extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: true
      };
      this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
      this.setState({ visible: !this.state.visible });
    }

    render() {
      var chart;
      var handlers = {
        getColor: function(i){
          var colors = d3.scale.category20().range().slice(10);
          return colors[Math.floor(Math.random() * colors.length)];
        }
      };
      if(this.state.visible) {
        chart = <NVD3Chart handlers={handlers} color={{name:'getColor', type:'function'}} tooltip={{enabled: true}} type="discreteBarChart" data={data} x="label" y="value" />;
      }

      return (
        <div>
          <button onClick={this.toggleVisibility}>Toggle Visibility</button>
          {chart}
        </div>
      );
    }
  }

  ReactDOM.render(
    <Chart />,
    document.getElementById('barChart')
  );
  ReactDOM.render(
    <Chart />,
    document.getElementById('barChart')
  );

})(window);
