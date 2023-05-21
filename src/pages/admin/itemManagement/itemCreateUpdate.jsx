import { Button, Card, Container, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { itemApi, userApi, itemCategoryApi } from "api";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ItemCreate() {
  let navigate = useNavigate();
  const { itemId } = useParams();
  const isEdit = Boolean(itemId);
  const [item, setItem] = useState({
    itemName: "",
    itemDescription: "",
    itemUsage: "",
    categoryId: "",
    priceMin: "",
    quantity: "",
  });
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
    },
  ]);
  const [category, setCategory] = useState([
    {
      categoryId: "",
      categoryName: "",
    },
  ]);

  useEffect(() => {
    // IFFE
    (async () => {
      const response = await userApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        userName: "",
      });
      setUser(response.listOfUser);
      const categoryList = await itemCategoryApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
      });
      setCategory(categoryList.listOfCategory);
      if (!itemId) return;
      try {
        const data = await itemApi.getById(itemId);
        if (data != null && data != "") {
          setItem(data);
        } else {
          navigate("/admin/itemList");
        }
      } catch (error) {
        console.log("Failed to fetch item details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [itemId]);

  function gotoList() {
    navigate("/admin/itemList");
  }

  const validationSchema = yup.object().shape({
    itemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    itemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    // ItemUsage: yup
    //   .string("Enter Item Usage")
    //   .required("Item Usage is required"),
    categoryId: yup
      .string("Choose Category")
      .required("Category is required"),
    priceMin: yup
      .string("Enter Price Min")
      .required("Price Min is required"),
    quantity: yup.number().min(1).required("Quantity is required"),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Item" : "Create Item"}
      </Typography>
      <Container>
        <Formik
          initialValues={item}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setErrors, setStatus }) => {
            try {
              setStatus({ success: false });
              let reponse;
              if (isEdit) {
                reponse = await itemApi.update(values);
              } else {
                reponse = await itemApi.create(values);
              }

              switch (reponse.Code) {
                case "G001":
                  return toast.error(reponse.Message);
                case "U001":
                  return toast.error(reponse.Message);
                case "I001":
                  return toast.error(reponse.Message);
                default: {
                  navigate("/admin/itemList");
                  if (isEdit) {
                    toast.success("Update Item Successed!");
                  } else {
                    toast.success("Create Item Successed!");
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
                      id="ItemName"
                      name="ItemName"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="PriceMin"
                      name="PriceMin"
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
                        id="standard-weight-helper-text-PriceMin"
                      >
                        {errors.priceMin}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="categoryId">Category *</InputLabel>
                      <Select
                        labelId="categoryId"
                        id="categoryId"
                        value={values.categoryId}
                        label="Role"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="Quantity"
                      name="Quantity"
                      label="Quantity *"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={values.quantity}
                      onChange={handleChange}
                      error={Boolean(touched.quantity && errors.quantity)}
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-Quantity"
                      >
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="ItemDescription"
                      name="ItemDescription"
                      label="Item Description *"
                      fullWidth
                      autoComplete=""
                      variant="outlined"
                      multiline
                      maxRows={4}
                      value={values.itemDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.itemDescription && errors.itemDescription
                      )}
                    />
                    {touched.itemDescription && errors.itemDescription && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-ItemDescription"
                      >
                        {errors.itemDescription}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="ItemUsage"
                      name="ItemUsage"
                      label="Item Usage"
                      fullWidth
                      variant="outlined"
                      multiline
                      maxRows={4}
                      value={values.itemUsage}
                      onChange={handleChange}
                      error={Boolean(
                        touched.itemUsage && errors.itemUsage
                      )}
                    />
                    {touched.itemUsage && errors.itemUsage && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-ItemUsage"
                      >
                        {errors.itemUsage}
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
