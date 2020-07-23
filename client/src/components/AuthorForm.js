import React, {useEffect, useState} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const AuthorForm = props => {
    const {action} = props;
    const[newAuthor, setNewAuthor] = useState({
        name: "",
        quote: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        quote: ""
        
    })

    useEffect(() => {
        if(action === "edit"){
            axios.get(`http://localhost:8000/api/authors/${props.id}`)
                .then(response => {
                    if(response.data.message === "success")
                        setNewAuthor(response.data.results)
                    else
                        navigate("/")
                })
        }
    }, )

    const submitHandler = e => {
        e.preventDefault();
        if(validate(newAuthor)){
            if(action === "edit"){
                axios.patch(`http://localhost:8000/api/authors/${props.id}`, newAuthor)
                    .then(res => {
                        console.log(res);
                        if(res.data.message === "success"){
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));
            } else{
                axios.post(`http://localhost:8000/api/authors`, newAuthor)
                    .then(res => {
                        if(res.data.message === "success") {
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    const changeHandler = e => {
        const curAuthor = {
            ...newAuthor,
            [e.target.name]: e.target.value
        }
        validate(curAuthor);
        setNewAuthor(curAuthor);
    }

    const validate = author => {
        let valid = false;
        const {...curErrors} = errors;
        if(author.name.length === 0){
            curErrors.name = "This is a required field.";
        } else if(author.name.length < 3) {
            curErrors.name = "Author name must be at least 3 characters in length.";
        } else {
            curErrors.name = "";
            valid = true;
        }
        
        if(author.quote.length === 0){
            curErrors.quote = "This is a required field.";
        } else if(author.quote.length < 3) {
            curErrors.quote = "Author quote must be at least 3 characters in length.";
        } else {
            curErrors.quote = "";
            valid = true;
        }
        setErrors(curErrors);
        return valid;
    }

    // const deleteHandler = () => {
    //     axios.delete(`http://localhost:8000/api/authors/${props.id}`)
    //         .then(res => {
    //             if(res.data.message === "success"){
    //                 navigate("/")
    //             }
    //         })
    //         .catch(err => console.log("Failed", err));
    // }

    return (
        <div>
            <div className="row">
                
                <h3 className = "col-sm-12 text-center">Add an Author</h3>
                
            </div>
            <div className="row">
                <form className="col-sm-12" onSubmit={ submitHandler }>

                    <div className="form-group row">
                        {
                            errors.name ? 
                            <p className="col-sm-8 offset-sm-4 text-danger">{ errors.name }</p>
                            :
                            ''
                        }
                        <label htmlFor="name" className="col-sm-4">Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="col-sm-4 form-control"
                            onChange={ changeHandler }
                            value={ newAuthor.name }
                        />
                    </div>

                    <div className="form-group row">
                        {
                            errors.quote ? 
                            <p className="col-sm-8 offset-sm-4 text-danger">{ errors.quote }</p>
                            :
                            ''
                        }
                        <label htmlFor="quote" className="col-sm-4">Quote:</label>
                        <input 
                            type="text" 
                            name="quote" 
                            className="col-sm-4 form-control"
                            onChange={ changeHandler }
                            value={ newAuthor.quote }
                        />
                    </div>
                        <Link className="col-sm-3" to="/"><button className="col-sm-3 btn btn-secondary">Cancel</button></Link>
                        <input type="submit" value="Submit" className="col-sm-3 btn btn-primary"/>
                </form>
        </div>
    </div>
    )
}

export default AuthorForm;
