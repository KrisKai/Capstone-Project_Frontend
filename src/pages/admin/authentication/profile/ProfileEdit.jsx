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
    createDate: "",
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.birthday) {
        response.birthday = dayjs.utc(response.birthday);
        response.createDate = response.createDate.substring(0, 10);
      }
      setCurrentInfo(response);
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
      .email("Enter Valid Email")
      .required("Email is required"),
    phone: yup.number().required("Phone is required"),
    address: yup.string("Enter Address").required("Address is required"),
    birthday: yup.string("Enter Birthday").required("Birthday is required"),
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
                  id="Username"
                  name="Username"
                  label="Username"
                  fullWidth
                  value={values.Username}
                  variant="standard"
                />
                {touched.Username && errors.Username && (
                  <FormHelperText error id="standard-weight-helper-nickName">
                    {errors.Username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Fullname"
                  name="Fullname"
                  label="Full name"
                  fullWidth
                  value={values.Fullname}
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.Fullname && errors.Fullname && (
                  <FormHelperText error id="standard-weight-helper-name">
                    {errors.Fullname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Address"
                  name="Address"
                  label="Address"
                  fullWidth
                  variant="standard"
                  value={values.Address}
                  onChange={handleChange}
                />
                {touched.Address && errors.Address && (
                  <FormHelperText error id="standard-weight-helper-address">
                    {errors.Address}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Phone"
                  name="Phone"
                  label="Phone Number"
                  fullWidth
                  variant="standard"
                  value={values.Phone}
                  onChange={handleChange}
                />
                {touched.Phone && errors.Phone && (
                  <FormHelperText error id="standard-weight-helper-phone">
                    {errors.Phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="Email"
                  name="Email"
                  label="Email"
                  fullWidth
                  variant="standard"
                  type="email"
                  value={values.Email}
                  onChange={handleChange}
                />
                {touched.Email && errors.Email && (
                  <FormHelperText error id="standard-weight-helper-email">
                    {errors.Email}
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
                    id="Birthday"
                    name="Birthday"
                    fullWidth
                    value={values.Birthday}
                    onChange={(value) => {
                      setFieldValue("Birthday", value);
                    }}
                    error={Boolean(touched.Birthday && errors.Birthday)}
                  />
                </LocalizationProvider>
                {touched.Birthday && errors.Birthday && (
                  <FormHelperText error id="standard-weight-helper-Birthday">
                    {errors.Birthday}
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
