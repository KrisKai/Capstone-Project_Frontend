import { Button, Card, Container, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/admin/authenticate/authSlice";
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState({
    username: "",
    password: null,
    retypePassword: null,
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    activeStatus: "ACTIVE",
  });
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!userId) return;
    // IFFE
    (async () => {
      try {
        const data = await userApi.getById(userId);
        if (data != null && data != "") {
          data.birthday = dayjs.utc(data.birthday);
          setUser(data);
        } else {
          navigate("/admin/userList");
        }
      } catch (error) {
        console.log("Failed to fetch user details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [userId]);

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
    phone: yup
      .string()
      .matches("^[0-9]{10,11}", "Invalid number phone")
      .required("Phone is required"),
    address: yup.string("Enter Address").required("Address is required"),
    birthday: yup.string("Enter Birthday").required("Birthday is required"),
    role: yup.string("Enter Role").required("Role is required"),
    // Password: yup
    //   .string("Enter Password")
    //   .min(8, "Must be atleast 8 digits")
    //   .required("Password is required"),
    // RetypePassword: yup
    //   .string("Enter Retype Password")
    //   .oneOf([yup.ref("Password"), null], "Passwords don't match!")
    //   .required("Retype Password is required"),
  });

  function gotoList() {
    navigate("/admin/userList");
  }

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update User" : "Create User"}
      </Typography>
      <Container>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setErrors, setStatus }) => {
            try {
              setStatus({ success: false });
              let reponse;
              if (isEdit) {
                console.log(values);
                reponse = await userApi.update(values);
              } else {
                reponse = await userApi.create(values);
              }
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
                  // if (reponse > 0) {
                  navigate("/admin/userList");
                  if (isEdit) {
                    toast.success("Update User Successed!");
                  } else {
                    toast.success("Create User Successed!");
                  }
                  // }
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
              <Card sx={{ padding: 8, gap: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="username"
                      name="username"
                      label="Username"
                      fullWidth
                      value={values.username}
                      variant="outlined"
                      onChange={handleChange}
                      InputProps={{
                        readOnly: isEdit,
                      }}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-nickName"
                      >
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="fullname"
                      name="fullname"
                      label="Full name"
                      fullWidth
                      value={values.Fullname}
                      variant="outlined"
                      onChange={handleChange}
                    />
                    {touched.fullname && errors.fullname && (
                      <FormHelperText error id="standard-weight-helper-name">
                        {errors.fullname}
                      </FormHelperText>
                    )}
                  </Grid>
                  {!isEdit && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="password"
                          name="password"
                          label="Password"
                          fullWidth
                          type="password"
                          value={values.password}
                          variant="outlined"
                          onChange={handleChange}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-password"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="retypePassword"
                          name="retypePassword"
                          label="Retype Password"
                          fullWidth
                          type="password"
                          value={values.retypePassword}
                          variant="outlined"
                          onChange={handleChange}
                        />
                        {touched.retypePassword && errors.retypePassword && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-repass"
                          >
                            {errors.retypePassword}
                          </FormHelperText>
                        )}
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="address"
                      name="address"
                      label="Address"
                      fullWidth
                      variant="outlined"
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
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="standard-weight-helper-phone">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl sx={{ mt: 1, minWidth: 200 }}>
                      <InputLabel id="role">Role</InputLabel>
                      <Select
                        labelId="role"
                        id="role"
                        value={values.role}
                        label="Role"
                        onChange={handleChange}
                        name="Role"
                      >
                        <MenuItem value="USER">User</MenuItem>
                        {currentUser.role === "Admin" && (
                          <MenuItem value="ADMIN">Admin</MenuItem>
                        )}
                        <MenuItem value="EMPL">Employee</MenuItem>
                      </Select>

                      {touched.role && errors.role && (
                        <FormHelperText error id="standard-weight-helper-role">
                          {errors.role}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
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
                        id="birthday"
                        name="birthday"
                        fullWidth
                        value={values.birthday}
                        onChange={(value) => {
                          setFieldValue("birthday", value);
                        }}
                        error={Boolean(
                          touched.birthday && errors.birthday
                        )}
                      />
                    </LocalizationProvider>
                    {touched.birthday && errors.birthday && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-Birthday"
                      >
                        {errors.birthday}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
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
                    <Button variant="outlined" onClick={gotoList}>
                      Return to List
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} textAlign="right">
                    <Button type="submit" variant="contained">
                      {isEdit ? "Update " : "Create "}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
}
