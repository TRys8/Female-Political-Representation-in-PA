var React = require("react");
var LineChart = require("react-chartjs").Line;

var ResultLineChart = React.createClass({

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
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: maleWins
        },
        {
            label: "Female",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: femaleWins
        }
      ]
    };

    return (
      <LineChart data={data} className="col-xs-10 col-xs-offset-1" />
    );
  }
});

module.exports = ResultLineChart;
