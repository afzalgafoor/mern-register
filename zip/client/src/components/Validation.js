const Validation = (user) => {

    let errors = {};

    if (!user.firstname) {
        errors.firstname = <h1 style={{ color: "blue" }}>"First Name is required"</h1>
    } else if (!/^[A-z][A-z]{3,23}$/.test(user.firstname)) {
        errors.firstname = <h1 style={{ color: "blue"}}>"Please enter correct name"</h1>
    }

    if (!user.lastname) {
        errors.lastname = "Last Name is required"
    } else if (!/^[A-z][A-z]{3,23}$/.test(user.lastname)) {
        errors.lastname = "Please enter correct name"
    }

    if (!user.email) {
        errors.email = "email is required"
    } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)) {
        errors.email = "email is invalid"
    }

    if (!user.password) {
        errors.password = "password is required"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(user.password)) {
        errors.password = "password is invalid"
    }

    return errors;
}

export default Validation;
