import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../../../../hooks/useAuth";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { UploadAvatar } from "../../../upload";
// @types
import { User } from "../../../../@types/account";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "redux/store";
import { getUserKrowdDetail } from "redux/slices/krowd_slices/investor";
import { InvestorAPI } from "_apis_/krowd_apis/investor";
import { User_Investor } from "../../../../@types/krowd/investor";
//

// ----------------------------------------------------------------------

export default function AccountGeneral({ investor }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [fileUpload, setFileUpload] = (useState < File) | (null > null);
  const {
    firstName,
    lastName,
    phoneNum,
    email,
    gender,
    dateOfBirth,
    role,
    status,
    address,
    bankName,
    bankAccount,
    taxIdentificationNumber,
    city,
    district,
    idCard,
  } = investor;
  const formikImage = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: investor.image,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await InvestorAPI.postImage({
          investorId: investor.id,
          files: fileUpload,
        })
          .then(() => {
            enqueueSnackbar("Cập nhật ảnh thành công", {
              variant: "success",
            });
            dispatch(getUserKrowdDetail(investor.id));
          })
          .catch(() => {
            enqueueSnackbar("Cập nhật ảnh thất bại", {
              variant: "error",
            });
            setFileUpload(null);
            setFieldValueImage("photoURL", null);
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });
  const {
    errors: errorsImage,
    values: valuesImage,
    touched: touchedImage,
    handleSubmit: handleSubmitImage,
    isSubmitting: isSubmittingImage,
    setFieldValue: setFieldValueImage,
  } = formikImage;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValueImage("photoURL", {
          ...file,
          preview: URL.createObjectURL(file),
        });
        setFileUpload(file);
      }
    },
    [setFieldValueImage]
  );
  return (
    <FormikProvider value={formikImage}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmitImage}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box my={3}>
              <UploadAvatar
                accept="image/*"
                file={valuesImage.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touchedImage.photoURL && errorsImage.photoURL)}
              />
              {fileUpload && (
                <Box display="flex" my={3} justifyContent="space-evenly">
                  <LoadingButton
                    color="warning"
                    type="submit"
                    variant="contained"
                    loading={isSubmittingImage}
                  >
                    Lưu
                  </LoadingButton>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setFileUpload(null);
                      setFieldValueImage("photoURL", investor.image);
                    }}
                  >
                    Hủy
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Thông tin cá nhân
                </Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Họ và tên"
                    value={`${firstName} ${lastName}`}
                  />
                  <TextField fullWidth disabled label="Email" value={email} />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Ngày sinh"
                    value={dateOfBirth ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Giới tính"
                    value={gender ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="SĐT"
                    value={phoneNum ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="CMND/CCCD"
                    value={idCard ?? "<Chưa cập nhật>"}
                  />
                </Stack>
                <Typography sx={{ fontWeight: "700" }}>Địa chỉ</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Số nhà, tên đường"
                    value={address ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Thành phố"
                    value={city ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    sx={{ width: "500px" }}
                    disabled
                    label="Quận"
                    value={district ?? "<Chưa cập nhật>"}
                  />
                </Stack>
                <Typography sx={{ fontWeight: "700" }}>Ngân hàng</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Tên ngân hàng"
                    value={bankName ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Số tài khoản"
                    value={bankAccount ?? "<Chưa cập nhật>"}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="MST"
                    value={taxIdentificationNumber ?? "<Chưa cập nhật>"}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
