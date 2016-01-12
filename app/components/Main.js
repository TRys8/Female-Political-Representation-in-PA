var React = require("react");
var ReactDOM = require("react-dom");
var ResultTable = require("./ResultTable");
var $ = require("jquery");

var Main = React.createClass({

  getInitialState: function() {
    return {
      lookup: {},
      electionResults: []
    };
  },

  componentWillMount: function() {
    $.ajax({
      url: "election-result-key.csv",
      dataType: "text",
      success: function(data) {
        data.split('\n').splice(1).forEach(function(row) {
          let items = row.split(",");
          let section = this.state.lookup[items[2]];

          if (section === undefined) {
            this.state.lookup[items[2]] = {};
            section = this.state.lookup[items[2]];
          }

          section[items[0]] = items[1];
        }.bind(this));

        $.ajax({
          url: "election-result.csv",
          dataType: "text",
          success: function(data) {

            let headers = undefined;
            data.split('\n').forEach(function(row, index) {
              if (index === 0) {
                headers = row.split(",");
                return;
              }

              let electionResult = {};
              let items = row.split(",");
              items.forEach(function(item, itemIndex) {
                let headerName = headers[itemIndex];

                electionResult[headerName] = this.state.lookup[headerName] === undefined ? item : this.state.lookup[headerName][item];

              }.bind(this));

              this.state.electionResults.push(electionResult);
            }.bind(this));

            this.setState(this.state);
            console.log(this.state);
          }.bind(this)
        });

      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container no-side-padding">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
              <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
              </a>
              <a className="navbar-brand" href="#">Pennsylvania Political</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">About Us</a></li>
              </ul>
              <form className="navbar-form navbar-right">
                <input type="text" className="form-control" placeholder="Search..." />
              </form>
            </div>
          </div>
        </nav>

        <div className="container top-buffer">
          <div className="row">
            <h1 className="page-header">Quick Facts</h1>
          </div>

          <div className="row">
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
          </div>

          <div className="row">
            <h1 className="page-header">Election Results</h1>
            <ResultTable electionResults={this.state.electionResults} />
          </div>

        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById("app"));
