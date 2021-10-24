import React from "react";
import axios from "common/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import panel from "components/Panel";
import AddInventory from "components/AddInventory";

class Products extends React.Component {
  state = {
    products: [], // current products after being filtered
    sourceProducts: [], // all products in the database
    cartNum: 0 // status promotion in Products to enable the communication between ToolBox and Product
  };

  componentDidMount() {
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      });
    });
    this.updateCartNum();
  }

  search = text => {
    const _products = this.state.sourceProducts.filter(p =>
      p.name.match(new RegExp(text, "gi"))); // global ignore(upper/lower)
    this.setState({
      products: _products,
    });
  };

  addPanel = () => {
    //panel.open({component, callback})
    panel.open({
      component: AddInventory,
      // to retrieve the updated data, add to the displayed and original product list, and setState
      callback: (data) => {
        if (data) {
          const _products = [...this.state.products]; // deep copy; by constrast in shallow copy the ref remains the same
          _products.push(data);
          this.setState({
            products: _products,
            sourceProducts: _products,
          });
        }
      },
    });
  };

  updateProduct = (product) => {
    const _products = [...this.state.products];
    const upIndex = _products.findIndex((p) => {
      return p.id === product.id;
    });
    _products[upIndex] = product;
    this.setState({
      products: _products,
      sourceProducts: _products,
    });
  };

  deleteProduct = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _products,
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.getCartNum();
    this.setState({
      cartNum: cartNum,
    });
  };

  getCartNum = async () => {
    const user = global.auth.getUser() || {};
    const res = await axios.get("/carts", {
      params: {
        userId: user.email,
      },
    });
    const carts = res.data || [];
    const cartNum = carts
      .map((cart) => cart.amount)
      .reduce((acc, val) => acc + val, 0);
    return cartNum;
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            {/*lable for a group animation components. prevent default div to keep layout unchanged*/}
            <TransitionGroup component={null}>
              {this.state.products.map((product) => (
                <CSSTransition /*lable for a single animation component*/
                  classNames="product-box" /*designate prefix to generate animation class names*/
                  timeout={300} /*max animation time*/
                  key={product.id} /*required*/
                >
                  <div className="column is-3" key={product.id}>
                    <Product
                      product={product}
                      update={this.updateProduct}
                      delete={this.deleteProduct}
                      cartNum={this.updateCartNum}
                    />
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          {(global.auth.getUser() || {}).type === 1 && (
            <button
              className="button is-primary add-btn"
              onClick={this.addPanel}
            >
              <i class="fas fa-plus"></i>
            </button>
          )}
        </div>
      </div>

    );
  }
}

export default Products;
