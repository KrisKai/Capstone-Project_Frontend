import { Box, Button, Card, FormHelperText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { tripItemApi } from "api";
import { toast } from "react-toastify";

const Preparation = (props) => {
  const { tripId } = useParams();
  const [openOverview, setOpenOverview] = useState(false);
  const [openOverview2, setOpenOverview2] = useState(false);
  const [openOverview3, setOpenOverview3] = useState(false);

  //nhu yeu pham
  const [itemList, setItemList] = useState([
    {
      itemId: 0,
      tripId: "",
      itemName: "",
      itemDescription: "",
      priceMin: "",
      quantity: "",
      categoryId: "",
    },
  ]);
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    list[index][name] = value;
    setItemList(list);
  };

  const handleItemRemove = async (itemId, index) => {
    if (itemId !== 0) {
      const reponse = await tripItemApi.delete(itemId || "");
      if (reponse > 0) {
        toast.success("Xoá thành công!");
      }
    }
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  const handleItemAdd = async (itemId, index) => {
    alert(itemId);
    if (itemId === 0) {
      const reponse = await tripItemApi.createUser(itemList[index]);
      switch (reponse.Code) {
        case "G001":
          return toast.error(reponse.Message);
        case "U001":
          return toast.error(reponse.Message);
        case "I001":
          return toast.error(reponse.Message);
        default:
          setItemList([
            ...itemList,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 2,
            },
          ]);
          return toast.success("Tạo thành công!");
      }
    } else {
      alert(21);
      const reponse = await tripItemApi.updateUser(itemList[index]);
      switch (reponse.Code) {
        case "G001":
          return toast.error(reponse.Message);
        case "U001":
          return toast.error(reponse.Message);
        case "I001":
          return toast.error(reponse.Message);
        default:
          return toast.success("Cập nhập thành công!");
      }
    }
  };

  //do an vat
  const [itemList1, setItemList1] = useState([
    {
      itemId: 0,
      tripId: "",
      itemName: "",
      itemDescription: "",
      priceMin: "",
      quantity: "",
      categoryId: "",
    },
  ]);
  //nguyen lieu nau an
  const [itemList2, setItemList2] = useState([
    {
      itemId: 0,
      tripId: "",
      itemName: "",
      itemDescription: "",
      priceMin: "",
      quantity: "",
      categoryId: "",
    },
  ]);
  useEffect(() => {
    // IFFE
    (async () => {
      console.log(props);
      if (!tripId) return;
      try {
        const data = await tripItemApi.getAllUser({
          pageIndex: 0,
          pageSize: 99999,
          categoryId: 2,
          tripId: tripId,
        });
        if (data != null && data != "") {
          setItemList([
            ...data.listOfItem,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 2,
            },
          ]);
        }
      } catch (error) {
        console.log("Failed to fetch trip item", error);
      }
    })();
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Chuẩn bị</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            minWidth: 300,
          }}
        >
          <CardHeader
            title="Nhu yếu phẩm"
            action={
              <IconButton
                onClick={() => setOpenOverview(!openOverview)}
                aria-label="expand"
                size="small"
              >
                {openOverview ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            }
          ></CardHeader>
          <div
            style={{
              backgroundColor: "rgba(211,211,211,0.4)",
            }}
          >
            <Collapse in={openOverview} timeout="auto" unmountOnExit>
              {itemList.map((item, index) => (
                <Card key={index} sx={{ padding: 2, margin: 1 }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} sx={{ marginBottom: 2 }}>
                      <TextField
                        id="itemName"
                        name="itemName"
                        label="Tên đồ dùng"
                        fullWidth
                        variant="outlined"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={1}>
                      <Button onClick={() => handleItemAdd(item.itemId, index)}>
                        <CheckCircleOutlineOutlinedIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button
                        color="error"
                        onClick={() => handleItemRemove(item.itemId, index)}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        id="priceMin"
                        name="priceMin"
                        label="Giá tiền"
                        fullWidth
                        variant="outlined"
                        value={item.priceMin}
                        onChange={(e) => handleItemChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        id="quantity"
                        name="quantity"
                        label="Số lượng"
                        fullWidth
                        variant="outlined"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(e, index)}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Collapse>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            minWidth: 300,
          }}
        >
          <CardHeader
            title="Đồ ăn vặt"
            action={
              <IconButton
                onClick={() => setOpenOverview2(!openOverview2)}
                aria-label="expand"
                size="small"
              >
                {openOverview2 ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            }
          ></CardHeader>
          <div
            style={{
              backgroundColor: "rgba(211,211,211,0.4)",
            }}
          >
            <Collapse in={openOverview2} timeout="auto" unmountOnExit>
              <CardContent>
                <Container
                  sx={{
                    height: 100,
                    lineHeight: 2,
                  }}
                >
                  An interview-centric course designed to prepare you for the
                  role of SDE for both product and service-based companies. A
                  placement preparation pack built with years of expertise.
                  Learn Resume Building, C++, Java, DSA, CS Theory concepts,
                  Aptitude, Reasoning, LLD, and much more!
                </Container>
              </CardContent>
            </Collapse>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            minWidth: 300,
          }}
        >
          <CardHeader
            title="Nguyên liệu nấu ăn"
            action={
              <IconButton
                onClick={() => setOpenOverview3(!openOverview3)}
                aria-label="expand"
                size="small"
              >
                {openOverview3 ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            }
          ></CardHeader>
          <div
            style={{
              backgroundColor: "rgba(211,211,211,0.4)",
            }}
          >
            <Collapse in={openOverview3} timeout="auto" unmountOnExit>
              <CardContent>
                <Container
                  sx={{
                    height: 100,
                    lineHeight: 2,
                  }}
                >
                  An interview-centric course designed to prepare you for the
                  role of SDE for both product and service-based companies. A
                  placement preparation pack built with years of expertise.
                  Learn Resume Building, C++, Java, DSA, CS Theory concepts,
                  Aptitude, Reasoning, LLD, and much more!
                </Container>
              </CardContent>
            </Collapse>
          </div>
        </Box>

        <hr />
      </Grid>
    </Grid>
  );
};

export default Preparation;
