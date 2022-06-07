import React, { useState, useEffect } from "react";
import User from "../Layouts/User";
import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { useSelector, useDispatch } from "react-redux";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object().shape({
  firstName: yup.string().required(" فیلد ضروری است"),
  lastName: yup.string().required(" فیلد ضروری است"),
  billingAddress: yup.string().required(" فیلد ضروری است"),
  phone: yup.string().matches(phoneRegExp, "شماره همراه درست وارد نشده"),
});
function FinallBuy() {
  // const { cartTotalAmount } = useSelector((state) => state.cart);
  // const cart = useSelector((state) => state.cart.cartItems);
  const [product,setproduct]=useState()
  
  // const [customer, setCustomer] = useState({});
  const productarr=[]
// const dispatch=useDispatch()
// async function productfun(){
//   cart.map((index)=>{
//   productarr.push({"id":index.id,"quantity":index.cartQuantity })
  
// })
   
// }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      billingAddress: "",
      shippingAddress: "",
      phone: "",
      dateDeliver: "",
    },
    validationSchema,
    onSubmit: async (values ,{resetForm}) => {
      const customer ={
        "orderStatus": "1",
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        billingAddress: values.billingAddress,
        "delivery":  values.dateDeliver,     
      };



        localStorage.setItem('customer', JSON.stringify([customer]));
      
    
        window.location.replace("http://127.0.0.1:5500/public/payment.html");

    },
  });
  
  // function toTimestamp(strDate){
  //   var datum = Date.parse(strDate);
  //   return datum;
  //  } 

  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container >
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid >
              <label>نام : </label>
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                size="small"
                required
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                helperText={
                  formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName
                }
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <label> نام خانوادگی :</label>
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                size="small"
                required
                id="lastName"
                name="lastName"
                placeholder=" نام خانوادگی  "
                autoComplete="lastName"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                helperText={
                  formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName
                }
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid >
              <label>آدرس:</label>
            </Grid>
            <Grid >
              <TextField
                margin="dense"
                size="small"
                required
                id="billingAddress"
                name="billingAddress"
                multiline
                autoComplete="billingAddress"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.billingAddress}
                helperText={
                  formik.errors.billingAddress &&
                  formik.touched.billingAddress &&
                  formik.errors.billingAddress
                }
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid >
              <label> آدرس تحویل ملک:</label>
            </Grid>
            <TextField
              margin="dense"
              size="small"
              required
              id="shippingAddress"
              name="shippingAddress"
              multiline
              autoComplete="shippingAddress"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.shippingAddress}
              helperText={
                formik.errors.shippingAddress &&
                formik.touched.shippingAddress &&
                formik.errors.shippingAddress
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <label>تلفن همراه:</label>
            </Grid>

            <TextField
              margin="dense"
              size="small"
              required
              id="phone"
              name="phone"
              autoComplete="phone"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.phone}
              helperText={
                formik.errors.phone &&
                formik.touched.phone &&
                formik.errors.phone
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <label>تاریخ تحویل: </label>
            </Grid>

            <DatePicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              weekPicker={false}
              onChange={(e)=> formik.setFieldValue("dateDeliver", e.unix * 1000,true)}
              value={formik.values.dateDeliver}
              helperText={
                formik.errors.dateDeliver &&
                formik.touched.dateDeliver &&
                formik.errors.dateDeliver
              }
              minDate={new DateObject({ calendar: persian })}
              //disabled={sendToDefaultAddress}
              // inputClass={Styles.custom_input}
            />
          </Grid>
        </Grid>
        <Button sx={{ mr: 80 }} variant="contained" type="submit">
          پرداخت
        </Button>
      </form>
  );
}
export default User(FinallBuy);