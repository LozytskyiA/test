import React from 'react';


function Post(props) {
  return (
    <tr className="article">
      <td>{props.title}</td>
      <td>{props.content}</td>
      <td>{props.comments.length}</td>
      <td className="actions">
        <span><a href="#">Show</a></span>
        <button className={`${props.id}`} onClick={props.delete}>X</button>
      </td>
    </tr>

  );
}

export default Post;