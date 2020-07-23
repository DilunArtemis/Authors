    import React from 'react';
    import {Router} from '@reach/router';
    import './App.css';
    import AllAuthors from './components/AllAuthors';
    import AuthorForm  from './components/AuthorForm';
    import EditAuthor from './components/EditAuthor';


    function App() {
    return (
    <div className="App">
        <nav className = "text-center">
        <h1 className = "col-sm-12 text-center">Favorite Authors</h1>
        </nav>
        
        <Router>
            <AllAuthors path = "/" default />
            {/* <OneAuthor path = "/author/:id" /> */}
            <AuthorForm path = "/author/new" action = "create"/>
            <EditAuthor path = "/author/:id/edit" action = "edit"/>
            <AuthorForm path = "/author/delete" action = "delete"/>
        </Router>

    </div>
    );
    }

    export default App;
