const valid = (user) => {

    var styles = {
        color :'red',
            size : '20px',
            style:'italic',
            variant: 'small-caps'
      };

    let errors = {};

    if (!user.firstname) {
        errors.firstname = <p style={styles}>"First Name is required"</p>
    } else if (!/^[A-z][A-z]{3,23}$/.test(user.firstname)) {
        errors.firstname = <p style={styles}>Please enter correct name</p>
        // errors.firstname=<p className="hi">working</p>
    }

    if (!user.lastname) {
        errors.lastname = <p style={styles}>Last Name is required</p>
    } else if (!/^[A-z][A-z]{0,23}$/.test(user.lastname)) {
        errors.lastname = <p style={styles}>Please enter correct name</p>
    }

    if (!user.email) {
        errors.email = <p style={styles}>Email is required</p>
    } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)) {
        errors.email = <p style={styles}>Email is invalid</p>
    }

    if (!user.password) {
        errors.password = <p style={styles}>Password is required</p>
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(user.password)) {
        errors.password = <p style={styles}>Password is invalid</p>
    }

    return errors;
}

export default valid;