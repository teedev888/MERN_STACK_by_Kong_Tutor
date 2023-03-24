import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditComponent = () => {

    const [state, setState] = useState({
        title: "",
        author: "",
        slug: ""
    });

    const { title, author, slug } = state;
    const [content,setContent] = useState('');
    const params = useParams();

    const submitContent = (event) => {
        setContent(event)
    };

    // get content to edit
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
            .then(response => {
                const { title, content, author, slug } = response.data;
                setState({ ...state, title, author, slug });
                setContent(content);
            })
            .catch(err => alert(err));
        // eslint-disable-next-line
    }, []);

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
            </div>
            <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความ"
                        style={{border:'1px solid #666'}}
                    />
                </div>
            <div className="from-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
            </div>
            <br />
            <input type="submit" value="อัพเดต" className="btn btn-primary" />
        </form>
    );

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author })
            .then(response => {
                Swal.fire(
                    'แจ้งเตือน',
                    'อัพเดตบทความเรียบร้อย',
                    'success'
                );
                const { title, content, author, slug } = response.data;
                setState({ ...state, title, author, slug });
                setContent(content);
            })
            .catch(err => {
                alert(err);
                // Swal.fire(
                //     'แจ้งเตือน',
                //     err.response.data.error,
                //     'error'
                // )
            });
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    );
}

export default EditComponent;