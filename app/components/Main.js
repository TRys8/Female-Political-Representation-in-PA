var React = require("react");
var ReactDOM = require("react-dom");
var $ = require("jquery");

var Navbar = require("./Navbar");
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
    let headers = undefined;
    data.split('\n').forEach(function(row, index) {
      if (index === 0) {
        headers = row.split(",");
        return;
      }

      let electionResult = {};
      let winner = undefined;
      let gender = undefined;
      let items = row.split(",");
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

      this.state.electionResults.push(electionResult);
    }.bind(this));

    this.setState(this.state);
    console.log(this.state);
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
              <h2 className="sub-header">Summary</h2>

              <div className="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                <h4>Label</h4>
                <span className="text-muted">Something else</span>
              </div>
              <div className="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                <h4>Label</h4>
                <span className="text-muted">Something else</span>
              </div>
              <div className="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                <h4>Label</h4>
                <span className="text-muted">Something else</span>
              </div>
              <div className="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                <h4>Label</h4>
                <span className="text-muted">Something else</span>
              </div>

              <div className="col-xs-12">
                <h3 className="sub-header">Winning Candidates by Gender</h3>
                <ResultBarChart electionResultsAggregate={this.state.electionResultsAggregate}/>
              </div>
            </div>

            <div className="col-xs-12">
              <h2 className="sub-header">Details</h2>
              <ResultTable electionResults={this.state.electionResults} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById("app"));
