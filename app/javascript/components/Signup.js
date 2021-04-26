import React from 'react';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.changePage = this.props.changePage;
        this.updateCurrentUser = this.props.updateCurrentUser;
        this.currentUser = this.props.currentUser;
        this.state = {
            page: 'signup',
            currentUser: this.props.currentUser
        }
    }
    handleSignUp(e){
        e.preventDefault();
        var that = this;
        var userInfo = {
            user:{
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password_confirmation: document.getElementById('password-confirm').value
            }
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            dataType: 'json',
            data: userInfo,
            error: function(error){
                console.log(error);
            },
            success: function(response){
                console.log(response);
                that.updateCurrentUser(document.getElementById('email').value);
                that.props.changePage('edit');
            }
        });
    }
    render(){
        const current_user = this.state.currentUser;
        return(
            <div>{current_user}
                <h2> Sign Up </h2>
                <form>
                    <input id="email" placeholder="email..."></input>
                    <input id="password" placeholder="password"></input>
                    <input id="password-confirm" placeholder="password-confirm"></input>
                    <button onClick={(e) => this.handleSignUp(e)}>Submit</button>
                </form>
                <button onClick={(e) => this.changePage('login')}>Log In</button>
            </div>
        );
    };
}
export default Signup;
