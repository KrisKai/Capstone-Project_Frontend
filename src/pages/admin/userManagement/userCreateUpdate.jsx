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
    Username: "",
    Password: null,
    RetypePassword: null,
    Role: "",
    Birthday: "",
    Email: "",
    Fullname: "",
    Phone: "",
    Address: "",
    ActiveStatus: "ACTIVE",
  });
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!userId) return;
    // IFFE
    (async () => {
      try {
        const data = await userApi.getById(userId);
        if (data != null && data != "") {
          data.Birthday = dayjs.utc(data.Birthday);
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
    Username: yup
      .string("Enter User Name")
      .matches(/\S/, "User Name is invalid")
      .required("User Name is required"),
    Fullname: yup
      .string("Enter Full Name")
      .required("Full Name is required"),
    Email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is required"),
    Phone: yup
      .string()
      .matches("^[0-9]{10,11}", "Invalid number phone")
      .required("Phone is required"),
    Address: yup.string("Enter Address").required("Address is required"),
    Birthday: yup.string("Enter Birthday").required("Birthday is required"),
    Role: yup.string("Enter Role").required("Role is required"),
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
                      id="Username"
                      name="Username"
                      label="Username"
                      fullWidth
                      value={values.Username}
                      variant="outlined"
                      onChange={handleChange}
                      InputProps={{
                        readOnly: isEdit,
                      }}
                    />
                    {touched.Username && errors.Username && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-nickName"
                      >
                        {errors.Username}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="Fullname"
                      name="Fullname"
                      label="Full name"
                      fullWidth
                      value={values.Fullname}
                      variant="outlined"
                      onChange={handleChange}
                    />
                    {touched.Fullname && errors.Fullname && (
                      <FormHelperText error id="standard-weight-helper-name">
                        {errors.Fullname}
                      </FormHelperText>
                    )}
                  </Grid>
                  {!isEdit && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="Password"
                          name="Password"
                          label="Password"
                          fullWidth
                          type="password"
                          value={values.Password}
                          variant="outlined"
                          onChange={handleChange}
                        />
                        {touched.Password && errors.Password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-password"
                          >
                            {errors.Password}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="RetypePassword"
                          name="RetypePassword"
                          label="Retype Password"
                          fullWidth
                          type="password"
                          value={values.RetypePassword}
                          variant="outlined"
                          onChange={handleChange}
                        />
                        {touched.RetypePassword && errors.RetypePassword && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-repass"
                          >
                            {errors.RetypePassword}
                          </FormHelperText>
                        )}
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="Address"
                      name="Address"
                      label="Address"
                      fullWidth
                      variant="outlined"
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
                      id="Phone"
                      name="Phone"
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      value={values.Phone}
                      onChange={handleChange}
                    />
                    {touched.Phone && errors.Phone && (
                      <FormHelperText error id="standard-weight-helper-phone">
                        {errors.Phone}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl sx={{ mt: 1, minWidth: 200 }}>
                      <InputLabel id="Role">Role</InputLabel>
                      <Select
                        labelId="Role"
                        id="Role"
                        value={values.Role}
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

                      {touched.Role && errors.Role && (
                        <FormHelperText error id="standard-weight-helper-role">
                          {errors.Role}
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
                        id="Birthday"
                        name="Birthday"
                        fullWidth
                        value={values.Birthday}
                        onChange={(value) => {
                          setFieldValue("Birthday", value);
                        }}
                        error={Boolean(
                          touched.Birthday && errors.Birthday
                        )}
                      />
                    </LocalizationProvider>
                    {touched.Birthday && errors.Birthday && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-Birthday"
                      >
                        {errors.Birthday}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="Email"
                      name="Email"
                      label="Email"
                      fullWidth
                      variant="outlined"
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
