// frontend/src/components/Likes/CreateLikeForm/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createLikeThunk } from "../../../store/likes";
import "./Likes.css";

const CreateLikeForm = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    sessionUser = useSelector(state => state.sessionUser);


};

export default CreateLikeForm;