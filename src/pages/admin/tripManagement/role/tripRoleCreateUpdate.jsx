import { Button, Card, Container, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { tripRoleApi, userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  let navigate = useNavigate();
  const { tripId, roleId } = useParams();
  const isEdit = Boolean(roleId);
  const [role, setRole] = useState({
    RoleName: "",
    Type: "",
    Description: "",
  });

  useEffect(() => {
    // IFFE
    (async () => {
      if (!roleId) return;
      try {
        const data = await tripRoleApi.getById(roleId);
        if (data != null && data != "") {
          setRole(data);
        } else {
          navigate(`/admin/tripRoleList/${tripId}`);
        }
      } catch (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate(`/admin/tripRoleList/${tripId}`);
  }

  const validationSchema = yup.object().shape({
    RoleName: yup
      .string("Enter Role Name")
      .required("Role Name is required"),
    Type: yup.string("Enter Type").required("Type is required"),
    Description: yup
      .string("Enter Role Description Time")
      .required("Role Description is required"),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Trip Role" : "Create Trip Role"}
      </Typography>
      <Container>
        <Formik
          initialValues={role}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setErrors, setStatus }) => {
            try {
              setStatus({ success: false });
              let reponse;
              if (isEdit) {
                reponse = await tripRoleApi.update(values);
              } else {
                reponse = await tripRoleApi.create(values);
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
                    navigate(`/admin/tripRoleList/${tripId}`);
                    if (isEdit) {
                      toast.success("Update Trip Role Successed!");
                    } else {
                      toast.success("Create Trip Role Successed!");
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
                    <TextField
                      id="RoleName"
                      name="RoleName"
                      label="Role Name"
                      fullWidth
                      variant="outlined"
                      value={values.RoleName}
                      onChange={handleChange}
                      error={Boolean(touched.RoleName && errors.RoleName)}
                    />
                    {touched.RoleName && errors.RoleName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-RoleName"
                      >
                        {errors.RoleName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="Type">Role Type</InputLabel>
                      <Select
                        labelId="Type"
                        id="Type"
                        value={values.Type}
                        label="Role"
                        onChange={handleChange}
                        name="Type"
                      >
                        <MenuItem value="HOST">Host</MenuItem>
                        <MenuItem value="MEMBER">Member</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                      </Select>

                      {touched.Type && errors.Type && (
                        <FormHelperText error id="standard-weight-helper-role">
                          {errors.Type}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="Description"
                      name="Description"
                      label="Role Description"
                      fullWidth
                      autoComplete=""
                      variant="outlined"
                      value={values.Description}
                      onChange={handleChange}
                      multiline
                      maxRows={4}
                      error={Boolean(
                        touched.Description && errors.Description
                      )}
                    />
                    {touched.Description && errors.Description && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-Description"
                      >
                        {errors.Description}
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
