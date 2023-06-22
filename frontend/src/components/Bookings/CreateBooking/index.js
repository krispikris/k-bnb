import    React, { useEffect, useState }            from "react";
import  { useDispatch }                             from "react-redux";
import  { useHistory }                              from "react-router-dom";
import  { createSpotThunk, createSpotImageThunk, getOneSpotThunk }   from "../../../store/spots";
import                                              "./Bookings.css";

