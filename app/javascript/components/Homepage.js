import React from 'react';
import Login from '../components/Login.js';
import Signup from '../components/Signup.js';
import Edit from '../components/Edit.js';

// var Homepage = React.createClass({
//     render: function(){
//         return <div>Homepage</div>
//     }
// })
//
// export default Homepage;
class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 'login',
            currentUser: 'anon'
        }
        this.getInitialState = this.getInitialState.bind(this);
        this.changePage = this.changePage.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }
    getInitialState(){
        return {
            page: 'login',
            currentUser: 'anon'
        };
    }
    changePage(newPage){
        this.setState({page: newPage});
    }
    updateCurrentUser(email){
        this.setState({currentUser: email});
    }
    render(){
        if(this.state.page == "login"){
            return(
                <Login changePage={this.changePage} updateCurrentUser={this.updateCurrentUser} currentUser = {this.state.currentUser} />
            );
        }else if(this.state.page == "signup"){
            return(
                <Signup changePage={this.changePage} updateCurrentUser={this.updateCurrentUser} currentUser = {this.state.currentUser} />
            );
        }else if(this.state.page == "edit"){
            return(
                <Edit changePage={this.changePage} updateCurrentUser={this.updateCurrentUser} currentUser = {this.state.currentUser} />
            );
        }
    }
}
export default Homepage;
