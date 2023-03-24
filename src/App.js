import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from 'html-react-parser';

function App() {

  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(response => {
        setBlogs(response.data)
      })
      .catch(err => alert(err));
  }

  useEffect(() => {
    fetchData()
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Confirm Delete ?",
      icon: "warning",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    })
  };

  const deleteBlog = (slug) => {

    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then(response=>{
      Swal.fire(
        "Deleted!",
        response.data.message,
        "success"
      )
      fetchData();
    }).catch(err=>console.log(err))
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="pt-1">{parse(blog.content.substring(0, 250))}</div>
            <p className="text-muted">ผู้เขียน: {blog.author} , เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
            <Link to={`/blog/edit/${blog.slug}`} className="btn btn-outline-success">Edit</Link>
            <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
