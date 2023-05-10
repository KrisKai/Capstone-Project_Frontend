import { Button, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { tripItemApi, tripApi, itemCategoryApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

dayjs.extend(utc);

export default function TripItemCreate() {
  let navigate = useNavigate();
  const { tripId, itemId } = useParams();
  const isEdit = Boolean(itemId);
  const [item, setItem] = useState({
    fldTripId: tripId,
    fldItemName: "",
    fldItemDescription: "",
    fldPriceMin: "",
    fldQuantity: "",
    fldCategoryId: "",
  });
  const [trip, setTrip] = useState({
    fldTripId: "",
    fldTripName: "",
  });
  const [category, setCategory] = useState([
    {
      fldCategoryId: "",
      fldCategoryName: "",
    },
  ]);

  useEffect(() => {
    // IFFE
    (async () => {
      const response = await tripApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        tripName: "",
      });
      setTrip(response.listOfTrip);
      const categoryList = await itemCategoryApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
      });
      setCategory(categoryList.listOfCategory);
      if (!tripId || !itemId) return;
      try {
        const data = await tripItemApi.getById(itemId);
        if (data != null && data != "") {
          setItem(data);
        } else {
          navigate(`/admin/tripItemList/${tripId}`);
        }
      } catch (error) {
        console.log("Failed to fetch trip item", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate(`/admin/tripItemList/${tripId}`);
  }

  const validationSchema = yup.object().shape({
    // fldTripId: yup
    //   .string("Choose Trip")
    //   .required("Trip is required"),
    fldItemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    fldItemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    fldPriceMin: yup
      .string("Enter Price")
      .required("Price is required"),
    fldCategoryId: yup.number().min(1).required("Category is required"),
    fldQuantity: yup.number().min(1).required("Quantity is required"),
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update Trip Item" : "Create Trip Item"}
      </Typography>
      <Formik
        initialValues={item}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            console.log(values)
            let reponse;
            if (isEdit) {
              reponse = await tripItemApi.update(values);
            } else {
              reponse = await tripItemApi.create(values);
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
                  navigate(`/admin/tripItemList/${tripId}`);
                  if (isEdit) {
                    toast.success("Update Trip Item Successed!");
                  } else {
                    toast.success("Create Trip Item Successed!");
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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripId"
                  name="fldTripId"
                  label="Trip Name"
                  fullWidth
                  variant="outlined"
                  value={values.fldTripId}
                  error={Boolean(touched.fldTripId && errors.fldTripId)}
                />
                {touched.fldTripId && errors.fldTripId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldTripId"
                  >
                    {errors.fldTripId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldItemName"
                  name="fldItemName"
                  label="Item Name *"
                  fullWidth
                  variant="outlined"
                  value={values.fldItemName}
                  onChange={handleChange}
                  error={Boolean(touched.fldItemName && errors.fldItemName)}
                />
                {touched.fldItemName && errors.fldItemName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldItemName"
                  >
                    {errors.fldItemName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="fldItemDescription"
                  name="fldItemDescription"
                  label="Item Description *"
                  fullWidth
                  variant="outlined"
                  value={values.fldItemDescription}
                  onChange={handleChange}
                  multiline
                  maxRows={4}
                  error={Boolean(
                    touched.fldItemDescription && errors.fldItemDescription
                  )}
                />
                {touched.fldItemDescription && errors.fldItemDescription && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldItemDescription"
                  >
                    {errors.fldItemDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="fldPrice"
                  name="fldPrice"
                  label="Price *"
                  fullWidth
                  variant="outlined"
                  value={values.fldPriceMin}
                  onChange={handleChange}
                  error={Boolean(touched.fldPrice && errors.fldPrice)}
                />
                {touched.fldPrice && errors.fldPrice && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldPrice"
                  >
                    {errors.fldPrice}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="fldCategoryId">Category *</InputLabel>
                  <Select
                    labelId="fldCategoryId"
                    id="fldCategoryId"
                    value={values.fldCategoryId}
                    label="fldCategoryId"
                    onChange={handleChange}
                    name="fldCategoryId"
                  >
                    {category.map((item) => (
                      <MenuItem value={item.fldCategoryId}>
                        {item.fldCategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.fldCategoryId && errors.fldCategoryId && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldCategoryId"
                    >
                      {errors.fldCategoryId}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="fldQuantity"
                  name="fldQuantity"
                  label="Quantity *"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={values.fldQuantity}
                  onChange={handleChange}
                  error={Boolean(touched.fldQuantity && errors.fldQuantity)}
                />
                {touched.fldQuantity && errors.fldQuantity && (
                  <FormHelperText error id="standard-weight-helper-fldQuantity">
                    {errors.fldQuantity}
                  </FormHelperText>
                )}
              </Grid>
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
