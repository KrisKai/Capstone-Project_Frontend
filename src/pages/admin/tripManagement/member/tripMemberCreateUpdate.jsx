import { Button, Card, Container, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { tripMemberApi, userApi } from "api";
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
    userId: "",
    tripId: tripId,
    memberRole: "",
    nickName: "",
    status: "Active",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
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
      if (!tripId || !memberId) return;
      try {
        const data = await tripMemberApi.getById(memberId);
        if (data != null && data != "") {
          setMember(data);
          setName(data.fullname);
          setEmail(data.email);
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

  function handleChangeSelect(userId) {
    user.forEach((item) => {
      if (item.userId === userId) {
        setName(item.fullname);
        setEmail(item.email);
      }
    });
  }

  const validationSchema = yup.object().shape({
    userId: yup.string("Enter User").required("User is required"),
    memberRole: yup
      .string("Enter Member Role")
      .required("Member Role is required"),
    nickName: yup
      .string("Enter Nick Name")
      .required("Nick Name is required"),
    // Status: yup
    //   .string("Enter Status")
    //   .required("Status is required"),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Trip Member" : "Create Trip Member"}
      </Typography>

      <Container>
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
              <Card sx={{ padding: 8, gap: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="userId">Trip Member Id</InputLabel>
                      <Select
                        labelId="userId"
                        id="userId"
                        value={values.userId}
                        label="Role"
                        onChange={(event) => {
                          setFieldValue("userId", event.target.value);
                          handleChangeSelect(event.target.value);
                        }}
                        name="userId"
                      >
                        {user.map((item) => (
                          <MenuItem value={item.userId}>
                            {item.fullname} ({item.email})
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.TripPresenter && errors.TripPresenter && (
                        <FormHelperText error id="standard-weight-helper-role">
                          {errors.TripPresenter}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Member Name"
                      fullWidth
                      variant="outlined"
                      value={name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      name="UserName"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      value={email}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="nickName"
                      name="nickName"
                      label="Nickname"
                      fullWidth
                      autoComplete=""
                      variant="outlined"
                      value={values.nickName}
                      onChange={handleChange}
                      error={Boolean(touched.nickName && errors.nickName)}
                    />
                    {touched.nickName && errors.nickName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-NickName"
                      >
                        {errors.nickName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="memberRole">Trip Role</InputLabel>
                      <Select
                        labelId="memberRole"
                        id="memberRole"
                        value={values.memberRole}
                        label="memberRole"
                        onChange={handleChange}
                        name="memberRole"
                      >
                        <MenuItem value="HOST">Host</MenuItem>
                        <MenuItem value="MEMBER">Member</MenuItem>
                      </Select>

                      {touched.userId && errors.userId && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-userId"
                        >
                          {errors.userId}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {isEdit ? (
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ minWidth: 530 }}>
                        <InputLabel id="Status">Status</InputLabel>
                        <Select
                          labelId="Status"
                          id="status"
                          value={values.status}
                          label="Status"
                          onChange={handleChange}
                          name="status"
                        >
                          <MenuItem value="ACTIVE">Active</MenuItem>
                          <MenuItem value="INACTIVE">Inactive</MenuItem>
                          <MenuItem value="BANNED">Banned</MenuItem>
                        </Select>

                        {touched.status && errors.status && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-Status"
                          >
                            {errors.status}
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
                    <Button type="submit" variant="contained">
                      {isEdit ? "Update" : "Create"}
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
