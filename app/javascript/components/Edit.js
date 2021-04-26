import React from 'react';
import Delete from '../components/Delete.js';
import Logout from '../components/Logout.js';

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.changePage = this.props.changePage;
        this.currentUser = this.props.currentUser;
        this.updateCurrentUser = this.props.updateCurrentUser;
        this.updatePassword = this.updatePassword.bind(this);
        this.updateEditSuccess = this.updateEditSuccess.bind(this);
        this.updateDeleteSuccess = this.updateDeleteSuccess.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.state = {
            page: 'edit',
            currentUser: this.props.currentUser,
            editSuccessful: null,
            deleteUnsuccessful: 'false'
        }
    }
    getInitialState(){
        return {
            editSuccessful: null,
            deleteUnsuccessful: 'false'
        }
    }
    updatePassword(e){
        e.preventDefault();
        var that = this;
        var userInfo = {
            user: {
                email: document.getElementById('email').value,
                password: document.getElementById('newPassword').value,
                password_confirmation: document.getElementById('newPasswordConfirm').value,
            }
        };
        $.ajaxSetup({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
        });
        $.ajax({
            type: 'PUT',
            url:'http://localhost:3000/users',
            dataType: 'json',
            data: userInfo,
            error: function(error){
                that.updateEditSuccess('false');
            },
            success: function(response){
                that.updateEditSuccess('true');
            }
        });
    }
    updateEditSuccess(question){
        this.setState({
            editSuccessful: question
        });
    }
    updateDeleteSuccess(question){
        this.setState({
            deleteUnsuccessful: question
        });
    }
    getEditData(){
        var customClass = "hidden";
        var message = "";
        if(this.state.editSuccessful == "true"){
            message = "password successfully updated";
            customClass = ""
        }else if(this.state.editSuccessful == "false"){
            message = "there was an issue updating your password.";
            customClass = "";
        }
        return {message: message, customClass: customClass}
    }
    render(){
        var current_user = this.state.currentUser;
        var errorClass = this.state.deleteUnsuccessful == 'true' ? "" : "hidden";
        var editData = this.getEditData();
        return(
            <div>
                <h1>henlo, {current_user}.</h1>
                <Logout changePage={this.props.changePage} />
                <h2>edit your account</h2>
                <form>
                    <input id="email" placeholder="email..."></input>
                    <input id="newPassword" placeholder="new password"></input>
                    <input id="newPasswordConfirm" placeholder="confirm new password"></input>
                    <button onClick={(e) => this.updatePassword(e)}>Submit</button>
                </form>
                <h2>Delete Account</h2>
                <div className="error-messages">
                    <p className="{editData.customClass}">{editData.message}</p>
                    <Delete changePage={this.props.changePage} updateDeleteError={this.updateDeleteSuccess} currentUser={this.props.currentUser} />
                    <p className="{errorClass}"> your account could not be deleted</p>
                </div>
            </div>
        );
    };
}
export default Edit;
