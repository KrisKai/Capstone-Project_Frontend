import { Button, FormHelperText } from "@mui/material";
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
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState({
    fldUsername: "",
    fldRole: "",
    fldBirthday: "",
    fldEmail: "",
    fldFullname: "",
    fldPhone: "",
    fldAddress: "",
    fldActiveStatus: "ACTIVE",
  });

  useEffect(() => {
    if (!userId) return;
    // IFFE
    (async () => {
      try {
        const data = await userApi.getById(userId);
        if (data != null && data != "") {
          data.fldBirthday = dayjs.utc(data.fldBirthday);
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

  function gotoList() {
    navigate("/admin/userList");
  }

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
                  disabled={isEdit}
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
              {!isEdit && (
                <>
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
                      <FormHelperText
                        error
                        id="standard-weight-helper-password"
                      >
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
                </>
              )}

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
              {isEdit ? (
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ mt: 1, minWidth: 200 }}>
                    <InputLabel id="fldActiveStatus">Status</InputLabel>
                    <Select
                      labelId="fldActiveStatus"
                      id="fldActiveStatus"
                      value={values.fldStatus}
                      label="fldActiveStatus"
                      onChange={handleChange}
                      name="fldActiveStatus"
                    >
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                      <MenuItem value="BANNED">Banned</MenuItem>
                    </Select>

                    {touched.fldActiveStatus && errors.fldActiveStatus && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldActiveStatus"
                      >
                        {errors.fldActiveStatus}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}></Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={gotoList}>
                  Return to List
                </Button>
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
