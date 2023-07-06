import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// third party
import { Formik } from "formik";
import * as Yup from "yup";

// project import
import { AnimateButton } from "components/Extend";
import { strengthColor, strengthIndicator } from "utils/password-strength";
import FirebaseSocial from "./FirebaseSocial";
// assets
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "redux/hooks";
import { handleRegister } from "redux/modules/user/authenticate/authUserSlice";
import { toast } from "react-toastify";
dayjs.extend(utc);
// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const dispatch = useAppDispatch();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          userName: "",
          password: "",
          rePassword: "",
          submit: null,
          phone: "",
          address: "",
          birthday: "",
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required("Hãy nhập họ của bạn"),
          lastname: Yup.string().max(255).required("Hãy nhập tên của bạn"),
          email: Yup.string()
            .email("Email không hợp lệ")
            .max(255)
            .required("Hãy nhập email của bạn"),
          userName: Yup.string().max(100).required("Hãy nhập Tên đăng nhập"),
          password: Yup.string().max(255).required("Hãy nhập Mật khẩu"),
          rePassword: Yup.string()
            .required("Hãy nhập lại mật khẩu")
            .oneOf([Yup.ref("password")], "Mật khẩu không giống nhau"),
          phone: Yup.string().min(10).max(11).required("Bắt buộc"),
          address: Yup.string().required("Bắt buộc"),
          birthday: Yup.string().required("Bắt buộc"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(handleRegister(values))
              .unwrap()
              .then((res) => {
                switch (res.Code) {
                  case "R001":
                    return toast.error(res.Message);
                  case "U002":
                    return toast.error(res.Message);
                  default:
                    toast("Đăng kí thành công! Vui lòng xác thực email của bạn!", toast.success);
                }
              });
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">
                    Họ *
                  </InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Tên *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Địa chỉ email *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userName-signup">Tên đăng nhập *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                    id="email-login"
                    value={values.userName}
                    name="Tên đăng nhập"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="User Name"
                    inputProps={{}}
                  />
                  {touched.userName && errors.userName && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.userName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          bgcolor: level?.color,
                          width: 85,
                          height: 8,
                          borderRadius: "7px",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
                <Stack spacing={1} mt={1}>
                  <InputLabel htmlFor="rePassword-signup">
                    Nhập lại mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rePassword && errors.rePassword)}
                    id="rePassword-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.rePassword}
                    name="rePassword"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle rePassword visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.rePassword && errors.rePassword && (
                    <FormHelperText error id="helper-text-rePassword-signup">
                      {errors.rePassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Số điện thoại *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-login"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address-signup">Địa chỉ *</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    id="address-signup"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Địa chỉ"
                    inputProps={{}}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-signup">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="birthday-signup">Ngày sinh *</InputLabel>
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
                        id="birthday"
                        name="birthday"
                        fullWidth
                        value={values.birthday}
                        onChange={(value) => {
                          setFieldValue("birthday", value);
                        }}
                        error={Boolean(
                          touched.birthday &&
                            errors.birthday
                        )}
                      />
                    </LocalizationProvider>
                  {touched.birthday && errors.birthday && (
                    <FormHelperText error id="helper-text-birthday-signup">
                      {errors.birthday}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Đăng kí
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Với việc đăng kí, bạn đã đồng ý với &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Điều khoản dịch vụ
                  </Link>
                  &nbsp; và &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Chính sách bảo mật
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Đăng kí với</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
