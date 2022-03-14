import React, { useEffect, useState } from 'react';


const Navbar = () => {
    const [user, setUser] = useState("")

    useEffect(() => {
        let user = localStorage.getItem('existingUser')
        if (user) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [])

    function logout() {
        localStorage.clear();
        window.location.href = '/login';
        // window.location.reload(false);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
                <a className="navbar-brand" href="/home">PROJEKT INDIGO</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {

                            user
                                ?
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={logout}>Logout </a>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login{user.firstname} </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Registration </a>
                                    </li>

                                </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;


