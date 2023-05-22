import { Button, Card, Container, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { itemCategoryApi, userApi } from "api";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function CategoryCreate() {
  let navigate = useNavigate();
  const { categoryId } = useParams();
  const isEdit = Boolean(categoryId);
  const [category, setCategory] = useState({
    categoryName: "",
    categoryBudget: null,
  });
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
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
      if (!categoryId) return;
      try {
        const data = await itemCategoryApi.getById(categoryId);
        if (data != null && data != "") {
          setCategory(data);
        } else {
          navigate("/admin/itemCategoryList");
        }
      } catch (error) {
        console.log("Failed to fetch category", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [categoryId]);

  function gotoList() {
    navigate("/admin/itemCategoryList");
  }

  const validationSchema = yup.object().shape({
    categoryName: yup
      .string("Enter Category Name")
      .required("Category Name is required"),
    categoryDescription: yup
      .string("Enter Category Description")
      .required("Category Description is required"),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Category" : "Create Category"}
      </Typography>
      <Container>
        <Formik
          initialValues={category}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setErrors, setStatus }) => {
            try {
              setStatus({ success: false });
              let reponse;
              if (isEdit) {
                reponse = await itemCategoryApi.update(values);
              } else {
                reponse = await itemCategoryApi.create(values);
              }

              switch (reponse.Code) {
                case "G001":
                  return toast.error(reponse.Message);
                case "U001":
                  return toast.error(reponse.Message);
                case "I001":
                  return toast.error(reponse.Message);
                default: {
                  navigate("/admin/itemCategoryList");
                  if (isEdit) {
                    toast.success("Update Category Successed!");
                  } else {
                    toast.success("Create Category Successed!");
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
                      id="categoryName"
                      name="categoryName"
                      label="Category Name"
                      fullWidth
                      variant="outlined"
                      value={values.categoryName}
                      onChange={handleChange}
                      error={Boolean(
                        touched.categoryName && errors.categoryName
                      )}
                    />
                    {touched.categoryName && errors.categoryName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-CategoryName"
                      >
                        {errors.categoryName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="categoryDescription"
                      name="categoryDescription"
                      label="Category Description"
                      fullWidth
                      autoComplete=""
                      variant="outlined"
                      value={values.categoryDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.categoryDescription &&
                          errors.categoryDescription
                      )}
                    />
                    {touched.categoryDescription &&
                      errors.categoryDescription && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-CategoryDescription"
                        >
                          {errors.categoryDescription}
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
