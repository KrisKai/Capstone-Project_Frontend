import React, { useEffect, useState } from "react";

// material-ui
import { TextField, FormHelperText, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { userApi } from "api";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectcurrentUserDTO } from "redux/modules/admin/authenticate/authSlice";

// ==============================|| PROFILE - EDIT ||============================== //

const ProfileChangePassword = (props) => {
  const currentUserDTO = useAppSelector(selectcurrentUserDTO);
  const [currentInfo, setCurrentInfo] = useState({
    UserId: currentUserDTO.userId,
    OldPassword: null,
    Password: null,
    RetypePassword: null,
  });

  const validationSchema = yup.object().shape({
    Password: yup
      .string("Enter Password")
      .min(8, "Must be atleast 8 digits")
      .required("Password is required"),
    RetypePassword: yup
      .string("Enter Retype Password")
      .oneOf([yup.ref("Password"), null], "Passwords don't match!")
      .required("Retype Password is required"),
  });

  return (
    <>
      <Formik
        initialValues={currentInfo}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            let response = await userApi.changePassword({
              UserId: values.UserId,
              OldPassword: values.OldPassword,
              Password: values.Password,
            });
            switch (response.Code) {
              case "G001":
                return toast.error(response.Message);
              case "U001":
                return toast.error(response.Message);
              case "I001":
                return toast.error(response.Message);
              case "V001":
                return toast.error(response.Message);
              default: {
                if (response > 0) {
                  toast.success("Update Your Password Successed!");
                  props.handleCallback(false);
                }
              }
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="OldPassword"
                  name="OldPassword"
                  label="Old Password"
                  fullWidth
                  type="password"
                  value={values.OldPassword}
                  variant="standard"
                  onChange={handleChange}
                />
                {/* {touched.OldPassword && errors.Password && (
                  <FormHelperText error id="standard-weight-helper-password">
                    {errors.Password}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="Password"
                  name="Password"
                  label="New Password"
                  fullWidth
                  type="password"
                  value={values.Password}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.Password && errors.Password && (
                  <FormHelperText error id="standard-weight-helper-password">
                    {errors.Password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="RetypePassword"
                  name="RetypePassword"
                  label="Retype new Password"
                  fullWidth
                  type="password"
                  value={values.RetypePassword}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.RetypePassword && errors.RetypePassword && (
                  <FormHelperText error id="standard-weight-helper-repass">
                    {errors.RetypePassword}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} textAlign="right">
                <Button
                  onClick={() => props.handleCallback(false)}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="outlined">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProfileChangePassword;
