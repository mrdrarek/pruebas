import React from 'react';

function Comment(props) {
  return(
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto:${props.emial}`}> {props.name}</a>
      </div>
      <p>
        {props.body}
      </p>
    </article>
  )
}

export default Comment;