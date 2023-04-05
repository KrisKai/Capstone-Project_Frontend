import { Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { userApi } from "api";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { openAlert } from "redux/modules/menu/menuSlice";
import * as yup from "yup";

export default function UserCreate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    nickName: yup.string("Enter First Name").required("First Name is required"),
    email: yup
      .string()
      .email("Enter Valid Email")
      .required("Email is required"),
    phone: yup.string("Enter Phone").required("Phone is required"),
    address: yup.string("Enter Address").required("Address is required"),
  });

  const initialValueForm = {
    nickName: "",
    email: "",
    phone: "",
    address: "",
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Create User
      </Typography>
      <Formik
        initialValues={initialValueForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            console.log(values);
            const reponse = await userApi.create(values);
            if (reponse > 0) {
              navigate("/admin/userList");
              dispatch(
                openAlert({ errorMsg: "Create User Successed!", open: true })
              );
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
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.nickName && errors.nickName && (
                  <FormHelperText error id="standard-weight-helper-nickName">
                    {errors.nickName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fullname"
                  name="fullname"
                  label="Email"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-email">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  fullWidth
                  variant="standard"
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
                  label="Số điện thoại"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-phone">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined">Trở về danh sách</Button>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Button type="submit" variant="outlined">
                  Đăng kí
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
