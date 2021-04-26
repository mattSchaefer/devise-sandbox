import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.changePage = this.props.changePage;
        this.updateCurrentUser = this.props.updateCurrentUser;
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            page: 'login',
            currentUser: 'anon'
        }
    };
    handleLogin(e){
        e.preventDefault();
        var that = this;
        var userInfo = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/sign_in",
            dataType: 'json',
            data: userInfo,
            error: function(error){
                console.log(error);
            },
            success: function(response){
                that.props.updateCurrentUser(response.email);
                that.props.changePage('edit');
            }
        });
    };
    render(){
        var current_user = this.state.currentUser;
        return(
            <div>
                <p>{current_user}</p>
                <h2>Login</h2>
                <form>
                    <input id="email" placeholder="email"></input>
                    <input id="password" placeholder="password"></input>
                    <button onClick={(e) => this.handleLogin(e)}>Submit</button>
                </form>
                <button onClick={(e) => this.props.changePage('signup')}> Sign Up! </button>
            </div>
        );
    };
}
export default Login;
