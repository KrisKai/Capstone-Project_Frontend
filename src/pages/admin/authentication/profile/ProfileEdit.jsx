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
    username: "",
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    createdDate: "",
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.birthday) {
        response.birthday = dayjs.utc(response.birthday);
        response.createdDate = response.createdDate.substring(0, 10);
      }
      setCurrentInfo(response);
      console.log(response);
    }
    getInfo();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string("Enter User Name")
      .matches(/\S/, "User Name is invalid")
      .required("User Name is required"),
    fullname: yup
      .string("Enter Full Name")
      .required("Full Name is required"),
    email: yup
      .string()
      .email("Enter Valid email")
      .required("email is required"),
    phone: yup.number().required("phone is required"),
    address: yup.string("Enter address").required("address is required"),
    birthday: yup.string("Enter birthday").required("birthday is required"),
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
                toast.success("Update Your Info Successed!");
                props.handleCallback(false)
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
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  value={values.username}
                  variant="standard"
                />
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-nickName">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fullname"
                  name="fullname"
                  label="Full name"
                  fullWidth
                  value={values.fullname}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.fullname && errors.fullname && (
                  <FormHelperText error id="standard-weight-helper-name">
                    {errors.fullname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="address"
                  fullWidth
                  variant="standard"
                  value={values.address}
                  onChange={handleChange}
                />
                {touched.address && errors.address && (
                  <FormHelperText error id="standard-weight-helper-address">
                    {errors.address}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  variant="standard"
                  value={values.phone}
                  onChange={handleChange}
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-phone">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  variant="standard"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-email">
                    {errors.email}
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
                    label="birthday"
                    id="birthday"
                    name="Birthday"
                    fullWidth
                    value={values.birthday}
                    onChange={(value) => {
                      setFieldValue("birthday", value);
                    }}
                    error={Boolean(touched.birthday && errors.birthday)}
                  />
                </LocalizationProvider>
                {touched.birthday && errors.birthday && (
                  <FormHelperText error id="standard-weight-helper-birthday">
                    {errors.birthday}
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

export default ProfileEdit;
