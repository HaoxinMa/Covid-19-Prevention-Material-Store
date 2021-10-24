import React from "react";
import axios from "common/axios";
import { toast } from "react-toastify";

class EditInventory extends React.Component {
  state = {
    id: "",
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  };

  componentDidMount() {
    console.log(this.props)
    const { id, name, image, tags, price, status } = this.props.product;
    this.setState({
      id,
      name,
      image,
      tags,
      price,
      status,
    });
  }

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
    axios.put(`products/${this.state.id}`, updateProducts).then(res => {
      this.props.close(res.data);
      toast.info("Update Item Successfully!");
    });
  };

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then(res => {
      this.props.delete(this.state.id);
      this.props.close();
      toast.warn("Delete Item!");
    });
  };

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
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
              <button className="button is-link">Confirm</button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={this.onDelete}
              >
                Delete
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.props.close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
