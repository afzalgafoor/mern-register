import React, { useState } from "react";
import './Register.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import valid from "../../valid";

const emailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const nameValid1 = /^[A-z][A-z]{3,23}$/;
const nameValid2 = /^[A-z][A-z]{0,23}$/;


const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: " ",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = (event) => {
    event.preventDefault();
    // setErrors(Validation(user))
    setErrors(valid(user))

    const { firstname, lastname, email, role, password, confirmPassword } = user;

    if (nameValid1.test(firstname)
      && nameValid2.test(lastname)
      && emailValid.test(email)
      && role
      && passwordValid.test(password)
      && password === confirmPassword) {
      axios.post("http://localhost:9002/register", user)
        .then((res) => {
          alert(res.data.message);
          // localStorage.setItem('existingUser', JSON.stringify(res.data))
          navigate("/login");
        });
    } else {
      alert("invlid input");
    }
  };

  // compoundDidMount(){
  //   axios.get("http://localhost:9002/users").then(response=>{
  //     console.log(response)
  //   })
  // }

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>

      {/* <div className="form-group"> */}
      <input
        type="text"
        name="firstname"
        value={user.firstname}
        required
        placeholder="First Name"
        onChange={handleChange} />
      {errors.firstname && <p className="errors">{errors.firstname}</p>}
      {/* </div> */}

      {/* <div className="form-group"> */}
      <input
        type="text"
        name="lastname"
        value={user.lastname}
        required
        placeholder="Last Name"
        onChange={handleChange} />
      {errors.lastname && <p className="errors">{errors.lastname}</p>}
      {/* </div> */}

      {/* <div className="form-group"> */}
      <input
        type="text"
        name="email"
        value={user.email}
        required
        placeholder="Your Email"
        onChange={handleChange} />
      {errors.email && <p className="errors">{errors.email}</p>}
      {/* </div> */}

      {/* <div className="form-group"> */}
      <select type="text"
        name="role"
        value={user.role}
        required
        onChange={handleChange}
        placeholder="Your Role" >
        {/* <option value="0">Please select the role</option> */}
        <option style={{ color: "blue" }} value="Brand">Brand</option>
        <option style={{ color: "blue" }} value="Manufacturer">Manufacturer</option>
        <option style={{ color: "blue" }} value="Supplier">Supplier</option>
      </select>
      {/* </div> */}

      {/* <div className="form-group"> */}
      <input
        type="password"
        name="password"
        required
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange} />

      {errors.password && <p className="errors">{errors.password}</p>}
      {/* </div> */}

      {/* <div className="form-group"> */}
      <input
        type="password"
        name="confirmPassword"
        value={user.confirmPassword}
        required
        placeholder="Confirm Password"
        onChange={handleChange} />
      {/* </div> */}

      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
// export function user() { }


