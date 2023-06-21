import { Box, Typography, CircularProgress, Button } from "@mui/material";

export default function MaintenancePage() {
  const gotoHome = () => {
    window.location.href = "/";
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CircularProgress size={64} color="primary" />
        <Typography variant="h5" component="h1" align="center" mt={2}>
          Đang cập nhật phát triển
        </Typography>
        <Typography variant="body1" align="center" mt={2}>
          Chúng tôi xin lỗi vì sự bất tiện này. Trang web này đang được phát
          triển. Vui lòng quay lại sau.
        </Typography>
        <Button variant="contained" size="large" onClick={gotoHome}>
          Quay lại trang chủ
        </Button>
      </Box>
    </Box>
  );
}
