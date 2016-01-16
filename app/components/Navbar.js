var React = require("react");

var Navbar = React.createClass({
  render: function() {
    return (
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
    );
  }
});

module.exports = Navbar;
