import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useSnackbar } from "notistack";
// material
import { Box, Grid, Card, Button, Typography, Stack } from "@mui/material";
// utils
import fakeRequest from "../../../../utils/fakeRequest";
// @types
import {
  CreditCard,
  UserAddressBook,
  UserInvoice,
} from "../../../../@types/user";
//
import AccountBillingAddressBook from "./AccountBillingAddressBook";
import AccountBillingInvoiceHistory from "./AccountBillingInvoiceHistory";

// ----------------------------------------------------------------------

export default function AccountBilling({ cards, addressBook, invoices }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required("Name is required"),
    cardNumber: Yup.string().required("Card number is required"),
    cardExpired: Yup.string().required("Card expired is required"),
    cardCvv: Yup.string().required("Cvv is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      cardExpired: "",
      cardCvv: "",
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await fakeRequest(500);
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar("Add card success", { variant: "success" });
    },
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountBillingAddressBook addressBook={addressBook} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
