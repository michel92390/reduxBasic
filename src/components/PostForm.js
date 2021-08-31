//jshint esversion:6
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../actions/post.action";

const PostForm = () => {
  //recuperer les infos de cette input
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  //recuperer le pseudo de lutilisateur (author)
  const user = useSelector((state) => state.userReducer); 

  //dispatch
  const dispatch = useDispatch();

  const handleForm = async (e) => {
    e.preventDefault();

    if (title && content) {
      const data = {
        title,
        content,
        author: user[0].pseudo,
        likes: 0
      };
      // en utilisant await, on est sure quil va va dabord attendre que la data soit bien injecter avant de faire le reste
      await dispatch(addPost(data));
      //pour effacer les entrees dans le post apres send
      setTitle('');
      setContent('');
      //recuperer l'id du nouveau post pour pouvoir modifier ou effacer le poste
      dispatch(getPosts());
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleForm(e)}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="What do you think..."
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        ></textarea>
        <input 
          type="submit" 
          value="Send" 
          
          />
      </form>
    </div>
  );
};

export default PostForm;
