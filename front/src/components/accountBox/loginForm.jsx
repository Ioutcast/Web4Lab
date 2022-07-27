import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as yup from "yup";
import { userLogin } from "../../api/authenticationService";
import { login, selectUser } from '../../api/userSlice';
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {AuthContext} from '../../context/index'
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  Input,
  MutedLink,
  SubmitButton
} from "./common";

import {toast } from "react-toastify";

const validationSchema = yup.object({
  login: yup.string().required(),
  password: yup.string().required(),
});

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const {isAuth,setIsAuth} = useContext(AuthContext);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  
 
  const onSubmit = async (values) => {
    
    setError(null);
    const response = await userLogin(values)
      .catch((err) => {
        if (err && err.response) setError(err.response.data);
        toast.error('🦄 Wow! not so easy!', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    if (response) {
      
      dispatch(login({
        accessToken: response.data,
        name: values.login}));
        setIsAuth(true);
        if(typeof localStorage.getItem('token') == 'undefined')
              localStorage.setItem('token',response.data);
        toast.success('Добро пожаловать! '+values.login+".", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }
  };

  const formik = useFormik({
    initialValues: { login: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="login"
            type="text"
            placeholder="Login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <MutedLink hidden href="#"></MutedLink>
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton  type="submit" disabled={!formik.isValid}>
          Login
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToSignup}>
          sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
