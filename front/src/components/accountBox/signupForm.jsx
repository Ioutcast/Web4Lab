import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer, FormError, FormSuccess,
  Input,
  MutedLink,
  SubmitButton
} from "./common";



const PASSWORD_REGEX = /.{3,10}/;

const validationSchema = yup.object({
  login: yup
    .string()
    .min(3, "Please enter login with 3+ letters")
    .required("Full login is required!"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;
  
    const response = await axios
      .put("http://localhost:8080/api/user", data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data);
        setSuccess(null);
      });
      if (response && response.data) {
        setError(null);
        setSuccess(response.data);
        formik.resetForm();
      }
    };


  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log("Error", formik.errors);

  return (
    <BoxContainer>
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="login"
            type="text"
            placeholder="Login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <FieldError>
            {formik.touched.login && formik.errors.login
              ? formik.errors.login
              : ""}
          </FieldError>
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
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}
          </FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit"disabled={!formik.isValid}>Sign up</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
