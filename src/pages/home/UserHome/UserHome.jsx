import {
  UserHeader,
  UserSuggest,
  FormCreateTrip,
  Footer,
} from "components/Home/HomeUser";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";
import History from "components/Home/HomeUser/History";
import { useEffect, useState } from "react";
import authUserApi from "api/user/authenticate/authUserApi";
import dataArray from "assets/data/typeOfPlaces";
import Logo from "assets/images/logo.png";
import { toast } from "react-toastify";

const HomeUser = () => {
  const [open, setOpen] = useState(false);
  const [clickedButtons, setClickedButtons] = useState([]);
  const isStartButtonDisabled = clickedButtons.length < 3;

  const handleButtonClick = (name) => {
    if (clickedButtons.includes(name)) {
      // Button was already clicked, remove it from clickedButtons array
      setClickedButtons(clickedButtons.filter((btn) => btn !== name));
    } else {
      // Button was not clicked, add it to clickedButtons array
      setClickedButtons([...clickedButtons, name]);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    setOpen(false);
    const response = await authUserApi.createUserInterest(clickedButtons);
    if (response > 0) {
      toast.success("Chào mừng bạn tới JourneySick");
    }
  };
  useEffect(() => {
    // IFFE
    (async () => {
      try {
        const data = await authUserApi.checkUserHavingInterest();
        if (data === 0) {
          setOpen(true);
        }
      } catch (error) {
        console.log("Failed to fetch trip details", error);
      }
    })();
  }, []);
  return (
    <Box>
      <UserHeader />
      <Box sx={{ paddingLeft: "20%", paddingRight: "20%" }}>
        <Box mt={10}>
          <UserSuggest />
        </Box>
        <Box mt={15}>
          <History />
        </Box>
        <Box mt={5}>
          <FormCreateTrip />
        </Box>
      </Box>
      <Box mt={10}>
        <Footer />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "450px",
            borderRadius: "12px",
            maxHeight: "612px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: 700,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 1,
                }}
              >
                <img src={Logo} alt="Logo" style={{ height: "30px" }} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                onClick={handleClose}
                color="inherit"
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                Bỏ qua
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 1,
                  fontFamily: "Noto Sans,Arial,sans-serif",
                  fontSize: "24px",
                }}
              >
                Thông tin về bạn
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              mt: 1,
              fontFamily: "Noto Sans, Arial, sans-serif",
              fontSize: "16px",
            }}
          >
            Bạn có thể cho chúng tôi biết sở thích của bạn để cải thiện đề xuất
            cho bạn.
          </DialogContentText>
          <DialogContentText
            sx={{
              textAlign: "center",
              mt: 1,
              fontFamily: "Noto Sans, Arial, sans-serif",
              fontSize: "14px",
            }}
          >
            Hãy chọn 3 cái hoặc hơn về các đỉa điểm ưa thích của bạn
          </DialogContentText>
          {dataArray.map((item, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                borderRadius: "48px",
                m: 0.5,
                backgroundColor: clickedButtons.includes(item.name)
                  ? "#86dba2"
                  : "#f3f4f5",
                color: "black",
              }}
              onClick={() => handleButtonClick(item.name)}
            >
              {item.code}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px 30px",
              fontSize: "20px",
              backgroundColor: "#168843",
              "&:disabled": {
                backgroundColor: "#56a876", // Custom background color for disabled state
              },
              borderRadius: 80,
              ml: 2,
              mr: 2,
              mb: 1,
            }}
            onClick={handleSubmit}
            disabled={isStartButtonDisabled}
          >
            Bắt Đầu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default HomeUser;
