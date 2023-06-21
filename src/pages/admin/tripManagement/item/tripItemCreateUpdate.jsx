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
    tripId: tripId,
    itemName: "",
    itemDescription: "",
    priceMin: "",
    quantity: "",
    categoryId: "",
  });
  const [trip, setTrip] = useState({
    TripId: "",
    TripName: "",
  });
  const [category, setCategory] = useState([
    {
      categoryId: "",
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
    itemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    itemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    priceMin: yup
      .string("Enter Price")
      .required("Price is required"),
    categoryId: yup.number().min(1).required("Category is required"),
    quantity: yup.number().min(1).required("Quantity is required"),
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
                  id="tripId"
                  name="tripId"
                  label="Trip Name"
                  fullWidth
                  variant="outlined"
                  value={values.tripId}
                  error={Boolean(touched.tripId && errors.tripId)}
                />
                {touched.tripId && errors.tripId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-TripId"
                  >
                    {errors.tripId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="itemName"
                  name="itemName"
                  label="Item Name *"
                  fullWidth
                  variant="outlined"
                  value={values.itemName}
                  onChange={handleChange}
                  error={Boolean(touched.itemName && errors.itemName)}
                />
                {touched.itemName && errors.itemName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-ItemName"
                  >
                    {errors.itemName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="itemDescription"
                  name="itemDescription"
                  label="Item Description *"
                  fullWidth
                  variant="outlined"
                  value={values.itemDescription}
                  onChange={handleChange}
                  multiline
                  maxRows={4}
                  error={Boolean(
                    touched.itemDescription && errors.itemDescription
                  )}
                />
                {touched.itemDescription && errors.itemDescription && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-ItemDescription"
                  >
                    {errors.itemDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="priceMin"
                  name="priceMin"
                  label="Price *"
                  fullWidth
                  variant="outlined"
                  value={values.priceMin}
                  onChange={handleChange}
                  error={Boolean(touched.priceMin && errors.priceMin)}
                />
                {touched.priceMin && errors.priceMin && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-Price"
                  >
                    {errors.priceMin}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="categoryId">Category *</InputLabel>
                  <Select
                    labelId="categoryId"
                    id="categoryId"
                    value={values.categoryId}
                    label="categoryId"
                    onChange={handleChange}
                    name="categoryId"
                  >
                    {category.map((item) => (
                      <MenuItem value={item.categoryId}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.categoryId && errors.categoryId && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-categoryId"
                    >
                      {errors.categoryId}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="quantity"
                  name="quantity"
                  label="Quantity *"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={values.quantity}
                  onChange={handleChange}
                  error={Boolean(touched.quantity && errors.quantity)}
                />
                {touched.quantity && errors.quantity && (
                  <FormHelperText error id="standard-weight-helper-Quantity">
                    {errors.quantity}
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
