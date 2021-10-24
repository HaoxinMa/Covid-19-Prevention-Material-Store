import React from "react";
import axios from "common/axios";
import { toast } from "react-toastify";

class AddInventory extends React.Component {
  state = {
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  submit = e => {
    e.preventDefault();
    const updateProducts = { ...this.state };
    axios.post("products", updateProducts).then(res => {
      this.props.close(res.data); // pass data to panel
      toast.success("Create Item Successfully!");
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
          {/* name */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Name</label>
              <textarea
                className="textarea"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* price */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Price</label>
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* tag */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Tags</label>
              <input
                type="text"
                className="input"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* image */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Image</label>
              <input
                type="text"
                className="input"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* status */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              {/* cancle button */}
              {/* type="button" is required; otherwise a button in form will submit the form be default  */}
              <button className="button" type="button" onClick={() => { this.props.close(); }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddInventory;
