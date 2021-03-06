import React from 'react';
import $ from 'jquery';
import Comments from './Comments.jsx';
import { Redirect } from 'react-router-dom';
import UserInfo from './UserInfo.jsx';


export default class PostDetails extends React.Component {

  constructor() {
    super();
    this.state ={
      parentComments: [],
      parentComment: ''
    }
  }

  getParentComments(parentId, postId) {
    console.log('here in get comments '+parentId);
    console.log('p2 '+postId);
    $.ajax({
        url: 'http://127.0.0.1:8000/comments/',
        datatype: 'json',
        data: {
          postId: postId,
          parentId: parentId
        },
        cache: false,
        error: function() {
          alert('Error!')
        },
        success: function(response) {
           this.setState ({
             parentComments: response
           })
        }.bind(this)
      })
  }

  onChange(e) {
    this.setState({
      parentComment: e.target.value
    })
  }

  postComment(parentId, postId, comment, user) {
    console.log('comment reply');
    $.ajax({
        url: 'http://127.0.0.1:8000/postComment/',
        datatype: 'json',
        type: 'POST',
        data: {
          postId: postId,
          parentId: parentId,
          comment: comment,
          user: user
        },
        cache: false,
        error: function() {
          alert('Error!')
        },
        success: function(response) {
            this.setState({
              parentComment: ''
            })
            this.getParentComments(parentId, postId);
        }.bind(this)
      })
  }

  isUserLoggedIn(user) {
     if (user != undefined) {
       return true;
     }
     return false;
   }

   render() {
     console.log('user info: '+ JSON.stringify(this.props));
     var parentComments = this.state.parentComments;
     var postId = this.props.match.params.id;
     var state = this.props.location.state
     var isLoggedIn = this.isUserLoggedIn(state);
     var profilePicture = state.profilePicture;
     return (

           !isLoggedIn
           ? (
             <Redirect to="/login" />
             )
           : (
             <div className="main">
               <div className="post_main">
               <div>
                  <UserInfo src = {'http://127.0.0.1:8000/media/' +profilePicture} username={'Vaibhav Wadikar'} />
              </div>

               <img src = {'http://127.0.0.1:8000/media/'+this.props.location.state.post} className="posts_photo_img"/>
                  <div>
                    <a onClick={this.getParentComments.bind(this, 0, postId)} className="comment_div">Comments</a>
                  </div>
                  <div>
                    <a onClick={this.getParentComments.bind(this, 0, postId)}  className="like_div">Like</a>
                  </div>
               </div>
               
               <br/>
               <br/>
               <div >
                 <div >
                   <img src={'http://127.0.0.1:8000/media/' +profilePicture} className="profile_photo_img" />
                 </div>
                 <div className="img">
                   <input type ="text" value={this.state.parentComment} onChange= {this.onChange.bind(this)} placeholder="Add a comment..." className="comment_box"/>
                   <button onClick={this.postComment.bind(this, 0, postId, this.state.parentComment, this.props.location.state.user)} className="comment_button" >Comment</button>
                 </div>
                 <Comments CommentObject={parentComments} post= {postId} user={this.props.location.state.user} />
               </div>
             </div>
             )
     );
   }
 }
