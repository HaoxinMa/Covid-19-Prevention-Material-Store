import React from "react";
import axios from "common/axios";
import panel from "components/Panel";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import EditInventory from "components/EditInventory";

class Product extends React.Component {
  editPanel = () => {
    panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        delete: this.props.delete,
      },
      callback: (data) => {
        if (data) this.props.update(data);
      },
    });
  };

  addCart = async () => {
    // jump to login page if the user is not logged in
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.warn("Please Login First!");
      return;
    }
    try {
      const user = global.auth.getUser() || {};
      const { id, name, image, price } = this.props.product;

      const res = await axios.get("/carts", {
        params: {
          productId: id,
          userId: user.email,
        },
      });
      const carts = res.data;
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.amount++;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          amount: 1,
          userId: user.email,
        };
        await axios.post("/carts", cart);
      }
      toast.success("Add to Cart Successfully!");
      this.props.cartNum();
    } catch (error) {
      toast.error("Failed to Add to Cart!");
    }
  };

  renderManagerBtn = () => {
    const user = global.auth.getUser() || {};
    // admin if type = 1
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.editPanel}>
          <span className="icon edit-btn">
            <i class="fas fa-edit"></i>
          </span>
        </div>
      );
    }
  };

  render() {
    const { name, image, tags, price, status } = this.props.product;
    const classChooser = {
      available: "product",
      unavailable: "product out-stock",
    };
    return (
      <div className={classChooser[status]}>
        <div className="p-content">
          {this.renderManagerBtn()}
          {/* image */}
          <div className="img-wrapper">
            {/* out-stock-text: z-index = -1 by default or 1 when under out-stock*/}
            <div className="out-stock-text">Out Of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
          </div>
          {/* tag */}
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        {/* price & cart */}
        <div className="p-footer">
          <p className="price">$ {price}</p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            <i className="fas fa-cart-plus"></i>
            <i class="fas fa-times"></i> {/* automatically hiden according to scss */}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
