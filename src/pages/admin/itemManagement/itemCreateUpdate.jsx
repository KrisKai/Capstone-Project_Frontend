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
    ItemName: "",
    ItemDescription: "",
    ItemUsage: "",
    CategoryId: "",
    PriceMin: "",
    Quantity: "",
  });
  const [user, setUser] = useState([
    {
      UserId: "",
      Email: "",
      Fullname: "",
    },
  ]);
  const [category, setCategory] = useState([
    {
      CategoryId: "",
      CategoryName: "",
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
    ItemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    ItemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    // ItemUsage: yup
    //   .string("Enter Item Usage")
    //   .required("Item Usage is required"),
    CategoryId: yup
      .string("Choose Category")
      .required("Category is required"),
    PriceMin: yup
      .string("Enter Price Min")
      .required("Price Min is required"),
    Quantity: yup.number().min(1).required("Quantity is required"),
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="PriceMin"
                      name="PriceMin"
                      label="Price *"
                      fullWidth
                      variant="outlined"
                      value={values.PriceMin}
                      onChange={handleChange}
                      error={Boolean(touched.PriceMin && errors.PriceMin)}
                    />
                    {touched.PriceMin && errors.PriceMin && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-PriceMin"
                      >
                        {errors.PriceMin}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="CategoryId">Category *</InputLabel>
                      <Select
                        labelId="CategoryId"
                        id="CategoryId"
                        value={values.CategoryId}
                        label="Role"
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
                  <Grid item xs={12} sm={6}>
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
                      <FormHelperText
                        error
                        id="standard-weight-helper-Quantity"
                      >
                        {errors.Quantity}
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
                      value={values.ItemDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.ItemDescription && errors.ItemDescription
                      )}
                    />
                    {touched.ItemDescription && errors.ItemDescription && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-ItemDescription"
                      >
                        {errors.ItemDescription}
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
                      value={values.ItemUsage}
                      onChange={handleChange}
                      error={Boolean(
                        touched.ItemUsage && errors.ItemUsage
                      )}
                    />
                    {touched.ItemUsage && errors.ItemUsage && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-ItemUsage"
                      >
                        {errors.ItemUsage}
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
