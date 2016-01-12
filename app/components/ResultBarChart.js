var React = require("react");
var BarChart = require("react-chartjs").Bar;

var ResultBarChart = React.createClass({

  componentDidMount: function() {
    // WTODO: work needed in legend
    // console.log(this.refs["barChart"].generateLegend());
  },

  render: function() {

    let maleWins = [];
    let femaleWins = [];
    let labels = Object.keys(this.props.electionResultsAggregate.yearly);

    labels.forEach(function(key) {
      let year = this.props.electionResultsAggregate.yearly[key];
      maleWins.push(year["Man"]);
      femaleWins.push(year["Woman"]);
    }.bind(this));

    let data = {
      labels: labels,
      datasets: [
        {
            label: "Male",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: maleWins
        },
        {
            label: "Female",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: femaleWins
        }
      ]
    };

    // WTODO: not needed
    let chartOptions = {
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };


    return (
      <BarChart ref="barChart" className="col-xs-10 col-xs-offset-1" data={data} />
    );
  }
});

module.exports = ResultBarChart;
