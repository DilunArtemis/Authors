import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import AuthorForm from './AuthorForm';

const EditAuthor = props => {
    const [author, setAuthor] = useState({
        name: "",
        quote: "",
        
    });
    
    const [errors, setErrors] = useState({
        name: "",
        quote: "",
        
    });
    const changeHandler = e => {
        const curData = {
            ...author,
            [e.target.name]: e.target.value
        };
        validate(curData);
        setAuthor(curData);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${props.id}`)
            .then(res => {
                setAuthor(res.data.results);
            })
            .catch(err => console.log(err));
    }, [])
    
    const validate = data => {
        const {...curErr} = errors;

        if(data.name.length === 0){
            curErr.name = "This is a required field."
        } else if(data.name.length < 2){
            curErr.name = "Author's name must be at least 2 characters long."
        } else if(data.name.length > 50) {
            curErr.name = "Name can't be longer than 50 characters"
        } else {
            curErr.name = "";
        }
        if(data.quote.length === 0){
            curErr.quote = "This is a required field."
        } else if(data.quote.length < 2){
            curErr.quote = "Author's quote must be at least 2 characters long."
        } else if(data.quote.length > 50) {
            curErr.quote = "Quote can't be longer than 50 characters"
        } else {
            curErr.quote = "";
        }

        setErrors(curErr);
    }   


    const submitData = () => {
        axios.put(`http://localhost:8000/api/authors/${props.id}/edit`, author)
            .then(res => {
                console.log(res);
                if(res.data.message === "success"){
                    // setAuthor({
                    //     name: `${props.name}`,
                    //     quote: `${props.quote}`
                    // })
                    navigate("/");
                }else {
                    setErrors({
                        name: "Something went wrong",
                        quote: "Something went wrong"
                    });
                }
            })
    }

    return (
        <div>
            <h2 className = "col-sm-12 text-center">Edit Author</h2>
            <AuthorForm id = {props.id} action = "edit" data = {author} changeHandler = {changeHandler} errors = {errors} setData = {setAuthor} submitData = {submitData} />
        </div>
    )
}

export default EditAuthor