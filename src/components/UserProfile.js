import React from "react";

const UserProfile = (props) => {

  // logout is to remove token from localstorage
  const logout = () => {
    global.auth.logout();
    props.close("logout"); // pass to <Hearder/> to use the router info there 
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">Profile</p>
      <fieldset disabled>
        {/* Username */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Username</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.username}
            />
          </div>
        </div>
        {/* Email */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Email</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.email}
            />
          </div>
        </div>
        {/* Type */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Type</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.type === 1 ? "Admin" : "Customer"}
            />
          </div>
        </div>
      </fieldset>
      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        {/* Loout */}
        <div className="control">
          <button className="button is-danger" type="button" onClick={logout}>
            Logout
          </button>
        </div>
        {/* Cancel */}
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
