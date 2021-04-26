import React from 'react';

class Delete extends React.Component{
    constructor(props){
        super(props);
        this.changePage = this.props.changePage;
        this.currentUser = this.props.currentUser;
        this.updateCurrentUser = this.props.updateCurrentUser;
        this.updateDeleteError = this.props.updateDeleteError;
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e){
        e.preventDefault();
        var that = this;
        var userInfo = {
            user:{
                email: that.props.currentUser
            }
        };
        $.ajaxSetup({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
        });
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/users",
            dataType: "json",
            data: userInfo,
            error: function(error){
                console.log("error");
                console.log(error);
                that.props.updateDeleteError('true');
            },
            success: function(response){
                console.log('response');
                console.log(response);
                that.props.updateDeleteError('false');
                that.props.changePage('login');
            }
        });
    }
    render(){
        return(
            <div>
                {this.currentUser}
                <form>
                    <button onClick = {(e) => this.handleDelete(e)}>nuke it</button>
                </form>
            </div>
        );
    };
}
export default Delete;
