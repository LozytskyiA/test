import React, {Component} from 'react';
import Post from "./Post";

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loaded: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    const article = document.getElementsByClassName('article');
  }

  loadApi(url){
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
  }

  deleteItem(event){
    const newData = this.state.data;
    newData.splice(event.target.className, 1);
    this.setState({
      data: newData,
    })
  }

  componentDidMount() {
    Promise.all([
      this.loadApi('https://jsonplaceholder.typicode.com/posts'),
      this.loadApi('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([posts, comments]) => this.setState({
        data: posts.map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
        })),
        comments: comments,
        loaded: true,
      }))
  }

  render() {

    if(this.state.loaded){
      return (
        <>
          <h2>Articles</h2>
          <table className="table">
            <thead>
            <tr className="table-title">
              <th>Article Title</th>
              <th>Content</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.data.map(item =>
              <Post key={item.id}
                    title={item.title}
                    content={item.body}
                    comments={item.comments}
                    delete={this.deleteItem}
                    id={item.id}
              />)}
            </tbody>
          </table>
          <div className="info">
            <div className="articles-info">{this.state.data.length} Articles <a href="#"></a></div>
            <div className="comments-info">{this.state.comments.length} Comments <a href="#"></a></div>
          </div>
        </>
      );
    }else {
      return (
        <span>Loading...</span>
      )
    }
  }
}

export default PostList;