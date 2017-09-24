import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import Posts from './Posts.jsx';
import PostDetails from './PostDetails.jsx';

class Home extends React.Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(<Router history = {browserHistory}>
    <Home>
      <Route path = "/posts" component = {Posts}></Route>
      <Route path = "/posts/:id" component = {PostDetails}></Route>
    </Home>
</Router>, document.getElementById('container'))