import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const AllAuthors = () => {
    // const {action} = props;
    const [allAuthors, setAllAuthors] = useState([]);

    const getAll = () => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res);
                setAllAuthors(res.data.results);
            });
    }

    useEffect(() => {
        getAll();
    }, );

const deleteHandler = (id) => {
    axios.delete(`http://localhost:8000/api/authors/${id}`)
        .then(res => {
            if(res.data.message === "success"){
                navigate("/")
            }
        })
        .catch(err => console.log("Failed", err));
}



    return (
        <div>
            {/* <h4>Favorite Authors</h4> */}
            <Link to = {"/author/new"}><button>Add Author</button></Link>
            <div>
                <table className = "col-sm-8 align-middle table table-striped table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quote</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allAuthors.map((author, i) => 
                            
                                <tr key = {i}>
                                    <td>{ author.name }</td>
                                    <td>{author.quote}</td>
                                    <td>
                                        <Link to={`/author/${author._id}/edit`}><button className = "col-sm-10 btn btn-primary">Edit</button></Link>
                                        <button className="col-sm-10 btn btn-danger" onClick={ ()=> deleteHandler(author._id) }>Delete </button>
                                    </td>
                                </tr>
                            
                            
                            )
                        }
                    </tbody>
                </table>
            </div>
            
            
        </div>
    )
}

export default AllAuthors;
