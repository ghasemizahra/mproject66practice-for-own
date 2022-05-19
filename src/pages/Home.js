import React, { useEffect, useState, useContext } from "react";
import {  Navigate } from 'react-router-dom'
import User from '../Layouts/User'
import axios from 'axios'
import { Box } from "@mui/material";
import { Linkstyle } from "../Assest/Style/Stylecomponent";
import { useDispatch } from 'react-redux';
import { setProduct } from '../Redux/ProductSlice'
import Main from '../Components/Home/Main'


function Home() {
  const dispatch = useDispatch()
  const url = 'http://localhost:3002/products';

  function getProduct() {
    axios({
      url: url,
      method: 'get',
      params: {
        token: 'TOP-SECRET'
      }
    })
      .then(function (response) {
        dispatch(setProduct(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => { getProduct() }, [])
  /////////////////////////////////////////////////////
  const [category, setCategory] = useState([]);
  useEffect(() => {

    getData();
  }, []);
  async function getData() {
    try {
      const category = await axios.get("http://localhost:3002/category");
      setCategory(category.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Box >
      {category == null ? <Navigate to='/' /> :
        category.map((item) => (
          <>
            <Linkstyle to='/category'   state={{ from: item }}>
              <h2> {item.name}</h2>
            </Linkstyle>
            <Main idCategory={item.id} key={item.id} /></>
        ))
      }
    </Box>
  )
} export default User(Home)


