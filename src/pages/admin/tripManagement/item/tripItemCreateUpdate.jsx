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
    TripId: tripId,
    ItemName: "",
    ItemDescription: "",
    PriceMin: "",
    Quantity: "",
    CategoryId: "",
  });
  const [trip, setTrip] = useState({
    TripId: "",
    TripName: "",
  });
  const [category, setCategory] = useState([
    {
      CategoryId: "",
      CategoryName: "",
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
    // TripId: yup
    //   .string("Choose Trip")
    //   .required("Trip is required"),
    ItemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    ItemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    PriceMin: yup
      .string("Enter Price")
      .required("Price is required"),
    CategoryId: yup.number().min(1).required("Category is required"),
    Quantity: yup.number().min(1).required("Quantity is required"),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
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
                  id="TripId"
                  name="TripId"
                  label="Trip Name"
                  fullWidth
                  variant="outlined"
                  value={values.TripId}
                  error={Boolean(touched.TripId && errors.TripId)}
                />
                {touched.TripId && errors.TripId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-TripId"
                  >
                    {errors.TripId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="ItemName"
                  name="ItemName"
                  label="Item Name *"
                  fullWidth
                  variant="outlined"
                  value={values.ItemName}
                  onChange={handleChange}
                  error={Boolean(touched.ItemName && errors.ItemName)}
                />
                {touched.ItemName && errors.ItemName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-ItemName"
                  >
                    {errors.ItemName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="ItemDescription"
                  name="ItemDescription"
                  label="Item Description *"
                  fullWidth
                  variant="outlined"
                  value={values.ItemDescription}
                  onChange={handleChange}
                  multiline
                  maxRows={4}
                  error={Boolean(
                    touched.ItemDescription && errors.ItemDescription
                  )}
                />
                {touched.ItemDescription && errors.ItemDescription && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-ItemDescription"
                  >
                    {errors.ItemDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Price"
                  name="Price"
                  label="Price *"
                  fullWidth
                  variant="outlined"
                  value={values.PriceMin}
                  onChange={handleChange}
                  error={Boolean(touched.Price && errors.Price)}
                />
                {touched.Price && errors.Price && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-Price"
                  >
                    {errors.Price}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="CategoryId">Category *</InputLabel>
                  <Select
                    labelId="CategoryId"
                    id="CategoryId"
                    value={values.CategoryId}
                    label="CategoryId"
                    onChange={handleChange}
                    name="CategoryId"
                  >
                    {category.map((item) => (
                      <MenuItem value={item.CategoryId}>
                        {item.CategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.CategoryId && errors.CategoryId && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-CategoryId"
                    >
                      {errors.CategoryId}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Quantity"
                  name="Quantity"
                  label="Quantity *"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={values.Quantity}
                  onChange={handleChange}
                  error={Boolean(touched.Quantity && errors.Quantity)}
                />
                {touched.Quantity && errors.Quantity && (
                  <FormHelperText error id="standard-weight-helper-Quantity">
                    {errors.Quantity}
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
          </form>
        )}
      </Formik>
    </>
  );
}
