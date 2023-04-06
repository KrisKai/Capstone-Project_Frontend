import { Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { userApi } from "api";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { openAlert } from "redux/modules/menu/menuSlice";
import * as yup from "yup";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function UserCreate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState({
    fldUsername: "",
    fldPassword: "",
    fldRetypePassword: "",
    fldRole: "ADMIN",
    fldBirthday: "",
    fldEmail: "",
    fldFullname: "",
    fldPhone: "",
    fldAddress: "",
  });

  useEffect(() => {
    if (!userId) return;
    // IFFE
    (async () => {
      try {
        const data = await userApi.getById(userId);
        setUser(data);
      } catch (error) {
        console.log("Failed to fetch user details", error);
      }
    })();
  }, [userId]);

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
    // fldBirthday: yup.string("Enter Birthday").required("Birthday is required"),
    fldRole: yup.string("Enter Role").required("Role is required"),
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
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update User" : "Create User"}
      </Typography>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            console.log(values);
            let reponse;
            if (isEdit) {
              reponse = await userApi.update(values);
            } else {
              reponse = await userApi.create(values);
            }
            if (reponse > 0) {
              navigate("/admin/userList");
              if (isEdit) {
                dispatch(
                  openAlert({ errorMsg: "Update User Successed!", open: true })
                );
              } else {
                dispatch(
                  openAlert({ errorMsg: "Create User Successed!", open: true })
                );
              }
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
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
                  onChange={handleChange}
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
                  id="fldPassword"
                  name="fldPassword"
                  label="Password"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldRetypePassword"
                  name="fldRetypePassword"
                  label="Retype Password"
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
              <Grid item xs={12} sm={2}>
                <FormControl sx={{ mt: 1, minWidth: 200 }}>
                  <InputLabel id="fldRole">Role</InputLabel>
                  <Select
                    labelId="fldRole"
                    id="fldRole"
                    value={values.fldRole}
                    label="Role"
                    onChange={handleChange}
                    name="fldRole"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="EMPL">Employee</MenuItem>
                  </Select>

                  {touched.fldRole && errors.fldRole && (
                    <FormHelperText error id="standard-weight-helper-role">
                      {errors.fldRole}
                    </FormHelperText>
                  )}
                </FormControl>
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
                <Button variant="outlined">Return to List</Button>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Button type="submit" variant="outlined">
                  {isEdit ? "Update " : "Create "}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
