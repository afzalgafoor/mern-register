import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Admin.css'
import _ from "lodash"

function Admin() {
  const url = 'http://localhost:9002/users'

  const [person, setPerson] = useState([])
  const [paginatedPost, setPaginatedPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const pageSize = 3

  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo - 1) * pageSize
    const paginatedPost = _(person).slice(startIndex).take(pageSize).value()
    setPaginatedPost(paginatedPost)
  }


  const [order, setOrder] = useState("ASC")

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...paginatedPost].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setPaginatedPost(sorted);
      setOrder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...paginatedPost].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setPaginatedPost(sorted);
      setOrder("ASC")
    }
  }


  useEffect(() => {
    getUser()
  }, [])


  async function deleteUser(_id, e) {
    const r = window.confirm("Are you sure ")
    if (r === true) {
      await axios.delete(`http://localhost:9002/users/delete/${_id}`,)
        .then((res) => {
          console.log('Student successfully deleted!')
          window.location.reload(false);
        }).catch((error) => {
          console.log(error)
          getUser()
        })
    }
  }


  async function getUser() {
    await axios.get(url).then(res => {
      setPerson(res.data.existinguser)
      setPaginatedPost(_(res.data).slice(0).take(pageSize).value)
      console.log("get")
      console.log(res)

    })
  }
  const pageCount = person ? Math.ceil(person.length / pageSize) : 0
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1)
  if (person?.length >= 1) {
    return (
      <div className='container '>
        <input
          type='text'
          placeholder='Search...'
          className="form-control"
          style={{ marginTop: 50, marginBottom: 20, width: "40%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <div className="table table-striped m-1 w-100">
          <table className="table" >
            <thead>
              <tr>
                <th scope="col" >First Name <i class="fa-solid fa-sort" onClick={() => sorting('firstname')}></i></th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPost?.length >= 1 && paginatedPost.filter((val) => {
                if (searchTerm === '') {
                  return val;
                } else if
                  (val.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              }).map((us, index) => {
                return (
                  <tr key={index}>
                    <td>{us.firstname}</td>
                    <td>{us.lastname}</td>
                    <td>{us.role}</td>
                    <td>{us.email}</td>
                    <td>
                      <div className=' m-1 w-100 '>
                        <i className="fa fa-trash mt-4 " aria-hidden="true" style={{ cursor: 'pointer' }} onClick={() => deleteUser(us._id)} ></i>
                        {/* <i className="fas fa-edit mt-6" aria-hidden="true" style={{ cursor: 'pointer' }}></i> */}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
        <nav className='d-flex justify-content-center'>
          <ul className='pagination'>
            {
              pages.map((page) => (
                <li className={
                  page === currentPage ? "page-item active" : "page-item"
                }>
                  <p className='page-link'
                    onClick={() => pagination(page)}>
                    {page}
                  </p>
                </li>
              ))
            }

          </ul>
        </nav>
      </div>

    )
  }


  return (
    <div>
      <h1>hi</h1>

    </div>

  )

}


export default Admin


