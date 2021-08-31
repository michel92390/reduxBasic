//jshint esversion:6

import { ADD_POST, EDIT_POST, GET_POSTS, DELETE_POST, ADD_LIKE } from "../actions/post.action";

const initialState ={};

export default function postReducer(state=initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case ADD_POST:
            //action.payload signifie le nouveua post et on se lajoute au state
            return [action.payload, ...state];
        case EDIT_POST:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        content: action.payload.content
                    };
                } else return post;
            });
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId);
        case ADD_LIKE:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        likes: action.payload.likes
                    };
                } else return post;
            })
        default: 
            return state;
    }
}

