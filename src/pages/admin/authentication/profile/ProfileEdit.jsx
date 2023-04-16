import React, { useEffect, useState } from "react";

// material-ui
import {
  Box,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "api";
import * as yup from "yup";
dayjs.extend(utc);

// ==============================|| PROFILE - EDIT ||============================== //

const ProfileEdit = (props) => {
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState({
    fldUsername: "",
    fldRole: "",
    fldBirthday: "",
    fldEmail: "",
    fldFullname: "",
    fldPhone: "",
    fldAddress: "",
    fldCreateDate: "",
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.fldBirthday) {
        response.fldBirthday = dayjs.utc(response.fldBirthday);
        response.fldCreateDate = response.fldCreateDate.substring(0, 10);
      }
      setCurrentInfo(response);
    }
    getInfo();
  }, []);

  const validationSchema = yup.object().shape({
    fldUsername: yup
      .string("Enter User Name")
      .matches(/\S/, "User Name is invalid")
      .required("User Name is required"),
    fldFullname: yup
      .string("Enter Full Name")
      .required("Full Name is required"),
    fldEmail: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is required"),
    fldPhone: yup.number().required("Phone is required"),
    fldAddress: yup.string("Enter Address").required("Address is required"),
    fldBirthday: yup.string("Enter Birthday").required("Birthday is required"),
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Customize your intro</Typography>
      </Box>
      <Formik
        initialValues={currentInfo}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            let reponse = await userApi.update(values);
            switch (reponse.Code) {
              case "G001":
                return toast.error(reponse.Message);
              case "U001":
                return toast.error(reponse.Message);
              case "I001":
                return toast.error(reponse.Message);
              case "V001":
                return toast.error(reponse.Message);
              default: {
                navigate("/admin/userList");
                toast.success("Update User Successed!");
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldUsername"
                  name="fldUsername"
                  label="Username"
                  fullWidth
                  value={values.fldUsername}
                  variant="standard"
                />
                {touched.fldUsername && errors.fldUsername && (
                  <FormHelperText error id="standard-weight-helper-nickName">
                    {errors.fldUsername}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldFullname"
                  name="fldFullname"
                  label="Full name"
                  fullWidth
                  value={values.fldFullname}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.fldFullname && errors.fldFullname && (
                  <FormHelperText error id="standard-weight-helper-name">
                    {errors.fldFullname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldAddress"
                  name="fldAddress"
                  label="Address"
                  fullWidth
                  variant="standard"
                  value={values.fldAddress}
                  onChange={handleChange}
                />
                {touched.fldAddress && errors.fldAddress && (
                  <FormHelperText error id="standard-weight-helper-address">
                    {errors.fldAddress}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldPhone"
                  name="fldPhone"
                  label="Phone Number"
                  fullWidth
                  variant="standard"
                  value={values.fldPhone}
                  onChange={handleChange}
                />
                {touched.fldPhone && errors.fldPhone && (
                  <FormHelperText error id="standard-weight-helper-phone">
                    {errors.fldPhone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="fldEmail"
                  name="fldEmail"
                  label="Email"
                  fullWidth
                  variant="standard"
                  type="email"
                  value={values.fldEmail}
                  onChange={handleChange}
                />
                {touched.fldEmail && errors.fldEmail && (
                  <FormHelperText error id="standard-weight-helper-email">
                    {errors.fldEmail}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateLibInstance={dayjs.utc}
                >
                  <DatePicker
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        paddingY: 1,
                        paddingX: 3,
                      },
                      "& .MuiFormLabel-root": {
                        paddingY: 1,
                      },
                    }}
                    label="Birthday"
                    id="fldBirthday"
                    name="fldBirthday"
                    fullWidth
                    value={values.fldBirthday}
                    onChange={(value) => {
                      setFieldValue("fldBirthday", value);
                    }}
                    error={Boolean(touched.fldBirthday && errors.fldBirthday)}
                  />
                </LocalizationProvider>
                {touched.fldBirthday && errors.fldBirthday && (
                  <FormHelperText error id="standard-weight-helper-fldBirthday">
                    {errors.fldBirthday}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} textAlign="right">
                <Button onClick={props.handleCallback(123)} variant="outlined">
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

export default ProfileEdit;
