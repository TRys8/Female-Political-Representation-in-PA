var React = require("react");
var ReactDOM = require("react-dom");
var $ = require("jquery");

var Navbar = require("./Navbar");
var ResultLineChart = require("./ResultLineChart");
var ResultBarChart = require("./ResultBarChart");
var ResultTable = require("./ResultTable");

var Main = React.createClass({

  getInitialState: function() {
    return {
      lookup: {},
      electionResults: [],
      electionResultsAggregate: {
        yearly: {}
      }
    };
  },

  processElectionResultKeyData: function(data) {
    data.split('\n').splice(1).forEach(function(row) {
      let items = row.split(",");
      let section = this.state.lookup[items[2]];

      if (section === undefined) {
        this.state.lookup[items[2]] = {};
        section = this.state.lookup[items[2]];
      }

      section[items[0]] = items[1];
    }.bind(this));

    // pre-init year aggregate
    Object.keys(this.state.lookup["Year"]).forEach(function(key) {
      let year = this.state.lookup["Year"][key];
      this.state.electionResultsAggregate.yearly[year] = {
        Man: 0,
        Woman: 0
      };
    }.bind(this));

    $.ajax({
      url: "election-result.csv",
      async: false,
      dataType: "text",
      success: this.processElectionResultData
    });
  },

  processElectionResultData: function(data) {

    // WTODO - handle case with , inside quotes
    /*
    console.log('189,"Jospeh W,",Battisto ,107,1,1,0,0,0,0,'.replace(/"([^"]|.)*"/g, function ($0) {
        return $0.replace(/,/g, "");
    }));
    */

    let dataValidation = {}; // WTODO: remove after validation is complete
    let headers = undefined;
    data.split('\n').forEach(function(row, index) {

      // filtering bad rows
      if (row.length === 0) {
        return;
      }

      let items = row.split(/,/);

      // header row
      if (index === 0) {
        headers = items;
        return;
      }

      let electionResult = {};
      let winner = undefined;
      let gender = undefined;
      items.forEach(function(item, itemIndex) {
        let headerName = headers[itemIndex];

        electionResult[headerName] = this.state.lookup[headerName] === undefined ? item : this.state.lookup[headerName][item];

        if (headerName === "Year") {
          let year = electionResult[headerName];

          if (winner) {
            ++this.state.electionResultsAggregate.yearly[year][gender];
          }

          winner = gender = undefined;
        }

        else if (headerName === "Gender") {
          gender = electionResult[headerName];
        }

        else if (headerName === "Winner") {
          winner = (electionResult[headerName] === "Yes");
        }

      }.bind(this));

      if (dataValidation[Object.keys(electionResult).length] === undefined) {
        dataValidation[Object.keys(electionResult).length] = 0;
      }

      ++dataValidation[Object.keys(electionResult).length];

      if (Object.keys(electionResult).length === 12) {
        //console.log(row);
      }

      this.state.electionResults.push(electionResult);
    }.bind(this));

    this.setState(this.state);
    console.log(this.state);
    console.log(dataValidation);
  },


  componentWillMount: function() {
    $.ajax({
      url: "election-result-key.csv",
      async: false,
      dataType: "text",
      success: this.processElectionResultKeyData
    });
  },

  render: function() {
    return (
      <div>
        <Navbar />

        <div className="container top-buffer">
          <div className="row">

            <div className="col-xs-12">
              <h1 className="page-header">Historial Election Results</h1>
            </div>
            <div className="col-xs-12">
              <h2 className="sub-header">Winning Candidates by Gender</h2>

              <div className="col-xs-12">
                <h2 className="sub-header">Graphs</h2>
                <ResultLineChart electionResultsAggregate={this.state.electionResultsAggregate}/>
                <ResultBarChart electionResultsAggregate={this.state.electionResultsAggregate}/>
              </div>

              <div className="col-xs-12 bottom-buffer">
                <h2 className="sub-header">Pivot table</h2>
                <div className="col-xs-10 col-xs-offset-1">
                  <ResultTable electionResults={this.state.electionResults} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById("app"));
