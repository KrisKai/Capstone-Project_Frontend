import { Button, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { userApi, tripMemberApi, tripRoleApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  let navigate = useNavigate();
  let { tripId, memberId } = useParams();
  const isEdit = Boolean(memberId);
  const [member, setMember] = useState({
    fldUserId: "",
    fldTripId: tripId,
    fldMemberRoleId: "",
    fldNickName: "",
    fldStatus: "Active",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([
    {
      fldUserId: "",
      fldEmail: "",
      fldFullname: "",
    },
  ]);

  const [role, setRole] = useState([
    {
      fldRoleName: "",
      fldDescription: "",
    },
  ]);
  const ref = useRef(null);

  useEffect(() => {
    // IFFE
    (async () => {
      const response = await userApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        userName: "",
      });
      setUser(response.listOfUser);
      const role = await tripRoleApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        roleName: "",
      });
      setRole(role.listOfRole);
      if (!tripId || !memberId) return;
      try {
        const data = await tripMemberApi.getById(tripId);
        if (data != null && data != "") {
          setMember(data);
        } else {
          navigate(`/admin/tripMemberList/${tripId}`);
        }
      } catch (error) {
        console.log("Failed to fetch trip member", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate(`/admin/tripMemberList/${tripId}`);
  }

  function handleChangeSelect() {
    console.log(ref.current.values);
    user.forEach((item) => {
      if (item.fldUserId === ref.current.values.fldUserId) {
        setName(item.fldFullname);
        setEmail(item.fldEmail);
      }
    });
  }

  const validationSchema = yup.object().shape({
    fldUserId: yup.string("Enter User").required("User is required"),
    fldMemberRoleId: yup
      .string("Enter Estimate Start Time")
      .required("Estimate Start Time is required"),
    fldNickName: yup
      .string("Enter Estimate Arrival Time")
      .required("Estimate Arrival Time is required"),
    fldStatus: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update Trip Member" : "Create Trip Member"}
      </Typography>
      <Formik
        innerRef={ref}
        initialValues={member}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            let reponse;
            if (isEdit) {
              reponse = await tripMemberApi.update(values);
            } else {
              reponse = await tripMemberApi.create(values);
            }

            switch (reponse.Code) {
              case "G001":
                return toast.error(reponse.Message);
              case "U001":
                return toast.error(reponse.Message);
              case "I001":
                return toast.error(reponse.Message);
              default: {
                if (reponse > 0) {
                  navigate(`/admin/tripMemberList/${tripId}`);
                  if (isEdit) {
                    toast.success("Update Trip Member Successed!");
                  } else {
                    toast.success("Create Trip Member Successed!");
                  }
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
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="fldUserId">Trip Member Id</InputLabel>
                  <Select
                    labelId="fldUserId"
                    id="fldUserId"
                    value={values.fldUserId}
                    label="Role"
                    onChange={handleChange}
                    name="fldUserId"
                  >
                    {user.map((item) => (
                      <MenuItem
                        value={item.fldUserId}
                        onClick={handleChangeSelect}
                      >
                        {item.fldFullname} ({item.fldEmail})
                      </MenuItem>
                    ))}
                  </Select>

                  {touched.fldTripPresenter && errors.fldTripPresenter && (
                    <FormHelperText error id="standard-weight-helper-role">
                      {errors.fldTripPresenter}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="name"
                  name="name"
                  label="Member Name"
                  fullWidth
                  variant="standard"
                  value={name}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="email"
                  name="fldUserName"
                  label="Email"
                  fullWidth
                  variant="standard"
                  value={email}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="fldNickName"
                  name="fldNickName"
                  label="Nickname"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  value={values.fldNickName}
                  onChange={handleChange}
                  error={Boolean(touched.fldNickName && errors.fldNickName)}
                />
                {touched.fldNickName && errors.fldNickName && (
                  <FormHelperText error id="standard-weight-helper-fldNickName">
                    {errors.fldNickName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={8}></Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="fldMemberRoleId">Trip Role</InputLabel>
                  <Select
                    labelId="fldMemberRoleId"
                    id="fldMemberRoleId"
                    value={values.fldMemberRoleId}
                    label="fldMemberRoleId"
                    onChange={handleChange}
                    name="fldMemberRoleId"
                  >
                    {role.map((item) => (
                      <MenuItem
                        value={item.fldRoleId}
                        onClick={handleChangeSelect}
                      >
                        {item.fldRoleName}
                      </MenuItem>
                    ))}
                  </Select>

                  {touched.fldUserId && errors.fldUserId && (
                    <FormHelperText error id="standard-weight-helper-fldUserId">
                      {errors.fldUserId}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {isEdit ? (
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ mt: 1, minWidth: 200 }}>
                    <InputLabel id="fldStatus">Status</InputLabel>
                    <Select
                      labelId="fldStatus"
                      id="fldStatus"
                      value={values.fldStatus}
                      label="Status"
                      onChange={handleChange}
                      name="fldStatus"
                    >
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                      <MenuItem value="BANNED">Banned</MenuItem>
                    </Select>

                    {touched.fldStatus && errors.fldStatus && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldStatus"
                      >
                        {errors.fldStatus}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} sm={8}></Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={gotoList}>
                  Return to List
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Button type="submit" variant="outlined">
                  {isEdit ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
