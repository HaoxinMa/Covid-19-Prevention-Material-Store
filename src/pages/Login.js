import React from "react";
import axios from "common/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// ref={register({rules})} to use react-hook-form

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const requestJWT = async (user) => {
    try {
      const { email, password } = user;
      const res = await axios.post("/auth/login", { email, password });
      const jwToken = res.data;
      // localStorage
      global.auth.setToken(jwToken);
      toast.success(`Welcome Back!`);
      props.history.push("/");
    } catch (error) {
      const errMessage = error.response.data.message;
      toast.error(errMessage);
    }
  };

  return (
    <div className="login-wrapper">
      {/* when submitted, function parameter of handleSubmit() has the input of submitted data */}
      <form className="box login-box" onSubmit={handleSubmit(requestJWT)}>
        {/* Email */}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              //  if there is an error (i.e. errors.email is not null), render the <input/> with class "is-danger"
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: "Please enter your email",
                pattern: {
                  value:
                    /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                  message: "Invalid Email!",
                },
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        {/* Password */}
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              placeholder="Password"
              name="password"
              ref={register({
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password should be greater than 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
