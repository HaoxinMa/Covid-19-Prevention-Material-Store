import React from "react";
import { render } from "react-dom";

class Panel extends React.Component {
  state = {
    active: false,
    component: null, // child component
    callback: () => { }, // callback function from Products/Product, data from AddInventory/EditInventory
  };

  close = (msg) => {
    this.setState({
      active: false,
    });
    this.state.callback(msg);
  };

  open = (
    // default parameters
    msg = {
      component: null,
      callback: () => { },
      props: {},
    }
  ) => {
    const { props, component, callback } = msg;
    const _key = new Date().getTime(); // use different key to force re-render
    // React.createElement(constructor AddInventory(), {...props})
    const childComponent = React.createElement(component, {
      ...props,
      close: this.close,
      key: _key,
    });
    this.setState({
      active: true,
      component: childComponent,
      callback,
    });
  };

  render() {
    const panelActive = {
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };
    return (
      <div className={panelActive[this.state.active]}>
        {/* close panel by clicking overlayer */}
        {/* no parameter will be passed using arrow function. prevent showing extra null product */}
        <div className="over-layer" onClick={() => { this.close(); }}></div>
        <div className="panel">
          <div className="head">
            {/* close panel by clicking x button */}
            {/* no parameter will be passed using arrow function. prevent showing extra null product */}
            <span className="close" onClick={() => { this.close(); }} >
              X
            </span>
            {this.state.component}
          </div>
        </div>
      </div>
    );
  }
}

// render a panel instance in a div
const _div = document.createElement("div");
document.body.appendChild(_div);
const _panel = render(<Panel />, _div);
export default _panel;
