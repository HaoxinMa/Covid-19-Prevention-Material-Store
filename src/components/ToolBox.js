import React from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class ToolBox extends React.Component {
  state = {
    searchText: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchText: value,
    });
    this.props.search(value);
  };

  clearSearchText = () => {
    this.setState({
      searchText: "",
    });
    this.props.search("");
  };

  // jump to cart page, or login page if the user is not logged in
  goCart = () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.warn("Please Login First!");
    } else {
      this.props.history.push("/cart");
    }
  };

  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">
          <i className="fa fa-shield-virus fa-lg"></i>Covid-19 Protect
        </div>
        <div className="search-box">
          <div className="field has-addons">
            {/* search box */}
            <div className="control">
              <input
                type="text"
                className="input search-input"
                placeholder="Search Product"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </div>
            {/* clear button */}
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div to="/cart" className="cart-box" onClick={this.goCart}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">{this.props.cartNum}</span>
        </div>
      </div >
    );
  }
}

export default withRouter(ToolBox);
