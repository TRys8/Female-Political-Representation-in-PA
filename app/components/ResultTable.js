var React = require("react");
var ReactPivot = require("react-pivot");

var ResultTable = React.createClass({
  render: function() {

    let dimensions = [
      { value: 'District', title: 'District' },
      { value: 'First Name', title: 'First Name' },
      { value: 'Last Name', title: 'Last Name' },
      { value: 'Unique Candidate ID', title: 'Unique Candidate ID' },
      { value: 'Office', title: 'Office' },
      { value: 'Party', title: 'Party' },
      { value: 'Gender', title: 'Gender' },
      { value: 'Election', title: 'Election' },
      { value: 'Year', title: 'Year' },
      { value: 'Incumbent', title: 'Incumbent' }
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
        activeDimensions={['Year', 'Gender']}
      />
    );
  }
});

module.exports = ResultTable;
