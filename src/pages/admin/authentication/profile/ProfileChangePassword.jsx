import React, { useEffect, useState } from "react";

// material-ui
import { TextField, FormHelperText, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { userApi } from "api";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/admin/authenticate/authSlice";

// ==============================|| PROFILE - EDIT ||============================== //

const ProfileChangePassword = (props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);
  const [currentInfo, setCurrentInfo] = useState({
    fldUserId: currentUser.userId,
    fldOldPassword: null,
    fldPassword: null,
    fldRetypePassword: null,
  });

  const validationSchema = yup.object().shape({
    fldPassword: yup
      .string("Enter Password")
      .min(8, "Must be atleast 8 digits")
      .required("Password is required"),
    fldRetypePassword: yup
      .string("Enter Retype Password")
      .oneOf([yup.ref("fldPassword"), null], "Passwords don't match!")
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
              fldUserId: values.fldUserId,
              fldOldPassword: values.fldOldPassword,
              fldPassword: values.fldPassword,
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
                  id="fldOldPassword"
                  name="fldOldPassword"
                  label="Old Password"
                  fullWidth
                  type="password"
                  value={values.fldOldPassword}
                  variant="standard"
                  onChange={handleChange}
                />
                {/* {touched.fldOldPassword && errors.fldPassword && (
                  <FormHelperText error id="standard-weight-helper-password">
                    {errors.fldPassword}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="fldPassword"
                  name="fldPassword"
                  label="New Password"
                  fullWidth
                  type="password"
                  value={values.fldPassword}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.fldPassword && errors.fldPassword && (
                  <FormHelperText error id="standard-weight-helper-password">
                    {errors.fldPassword}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="fldRetypePassword"
                  name="fldRetypePassword"
                  label="Retype new Password"
                  fullWidth
                  type="password"
                  value={values.fldRetypePassword}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.fldRetypePassword && errors.fldRetypePassword && (
                  <FormHelperText error id="standard-weight-helper-repass">
                    {errors.fldRetypePassword}
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
