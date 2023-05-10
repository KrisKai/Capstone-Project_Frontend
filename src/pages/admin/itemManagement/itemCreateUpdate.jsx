import { Button, FormHelperText } from "@mui/material";
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
    fldItemName: "",
    fldItemDescription: "",
    fldItemUsage: "",
    fldCategoryId: "",
    fldPriceMin: "",
    fldQuantity: "",
  });
  const [user, setUser] = useState([
    {
      fldUserId: "",
      fldEmail: "",
      fldFullname: "",
    },
  ]);
  const [category, setCategory] = useState([
    {
      fldCategoryId: "",
      fldCategoryName: "",
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
    fldItemName: yup
      .string("Enter Item Name")
      .required("Item Name is required"),
    fldItemDescription: yup
      .string("Enter Item Description")
      .required("Item Description is required"),
    // fldItemUsage: yup
    //   .string("Enter Item Usage")
    //   .required("Item Usage is required"),
    fldCategoryId: yup
      .string("Choose Category")
      .required("Category is required"),
    fldPriceMin: yup
      .string("Enter Price Min")
      .required("Price Min is required"),
    fldQuantity: yup.number().min(1).required("Quantity is required"),
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update Item" : "Create Item"}
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
            <Grid container spacing={3}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldPriceMin"
                  name="fldPriceMin"
                  label="Price *"
                  fullWidth
                  variant="outlined"
                  value={values.fldPriceMin}
                  onChange={handleChange}
                  error={Boolean(touched.fldPriceMin && errors.fldPriceMin)}
                />
                {touched.fldPriceMin && errors.fldPriceMin && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldPriceMin"
                  >
                    {errors.fldPriceMin}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl sx={{ minWidth: 400 }}>
                  <InputLabel id="fldCategoryId">Category *</InputLabel>
                  <Select
                    labelId="fldCategoryId"
                    id="fldCategoryId"
                    value={values.fldCategoryId}
                    label="Role"
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12}>
                <TextField
                  id="fldItemDescription"
                  name="fldItemDescription"
                  label="Item Description *"
                  fullWidth
                  autoComplete=""
                  variant="outlined"
                  multiline
                  maxRows={4}
                  value={values.fldItemDescription}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldItemDescription && errors.fldItemDescription
                  )}
                />
                {touched.fldItemDescription && errors.fldItemDescription && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-fldItemDescription"
                  >
                    {errors.fldItemDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="fldItemUsage"
                  name="fldItemUsage"
                  label="Item Usage"
                  fullWidth
                  variant="outlined"
                  multiline
                  maxRows={4}
                  value={values.fldItemUsage}
                  onChange={handleChange}
                  error={Boolean(touched.fldItemUsage && errors.fldItemUsage)}
                />
                {touched.fldItemUsage && errors.fldItemUsage && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-fldItemUsage"
                  >
                    {errors.fldItemUsage}
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
