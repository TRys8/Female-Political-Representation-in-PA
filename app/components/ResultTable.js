var React = require("react");
var ReactPivot = require("react-pivot");

var ResultTable = React.createClass({
  render: function() {

    let dimensions = [
      { value: 'Gender', title: 'Gender' },
      { value: 'Office', title: 'Office' },
      { value: 'Party', title: 'Party' },
    ];

    let reduce = function(row, memo) {
      memo.winsTotal = (memo.winsTotal || 0) + (row.Winner === "Yes" ? 1 : 0);
      return memo;
    };

    let calculations = [
      {
        title: 'Wins', value: 'winsTotal',
        template: function(val, row) {
          return val.toFixed(2)
        }
      }
    ];

    return (
      <ReactPivot
        rows={this.props.electionResults}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        activeDimensions={['Gender']}
      />
    );
  }
});

module.exports = ResultTable;
