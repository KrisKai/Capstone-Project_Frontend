import { Box, Button, Card, FormHelperText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
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
    if (index + 1 !== list.length) {
      list.splice(index, 1);
      setItemList(list);
    }
  };

  const handleItemAdd = async (itemId, index) => {
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

  const handleItemChange1 = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList1];
    list[index][name] = value;
    setItemList1(list);
  };

  const handleItemRemove1 = async (itemId, index) => {
    if (itemId !== 0) {
      const reponse = await tripItemApi.delete(itemId || "");
      if (reponse > 0) {
        toast.success("Xoá thành công!");
      }
    }
    const list = [...itemList1];
    if (index + 1 !== list.length) {
      list.splice(index, 1);
      setItemList1(list);
    }
  };

  const handleItemAdd1 = async (itemId, index) => {
    if (itemId === 0) {
      const reponse = await tripItemApi.createUser(itemList1[index]);
      switch (reponse.Code) {
        case "G001":
          return toast.error(reponse.Message);
        case "U001":
          return toast.error(reponse.Message);
        case "I001":
          return toast.error(reponse.Message);
        default:
          setItemList1([
            ...itemList1,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 3,
            },
          ]);
          return toast.success("Tạo thành công!");
      }
    } else {
      const reponse = await tripItemApi.updateUser(itemList1[index]);
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

  const handleItemChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList2];
    list[index][name] = value;
    setItemList2(list);
  };

  const handleItemRemove2 = async (itemId, index) => {
    if (itemId !== 0) {
      const reponse = await tripItemApi.delete(itemId || "");
      if (reponse > 0) {
        toast.success("Xoá thành công!");
      }
    }
    const list = [...itemList2];
    if (index + 1 !== list.length) {
      list.splice(index, 1);
      setItemList2(list);
    }
  };

  const handleItemAdd2 = async (itemId, index) => {
    if (itemId === 0) {
      const reponse = await tripItemApi.createUser(itemList2[index]);
      switch (reponse.Code) {
        case "G001":
          return toast.error(reponse.Message);
        case "U001":
          return toast.error(reponse.Message);
        case "I001":
          return toast.error(reponse.Message);
        default:
          setItemList2([
            ...itemList2,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 4,
            },
          ]);
          return toast.success("Tạo thành công!");
      }
    } else {
      const reponse = await tripItemApi.updateUser(itemList2[index]);
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
        const data1 = await tripItemApi.getAllUser({
          pageIndex: 0,
          pageSize: 99999,
          categoryId: 3,
          tripId: tripId,
        });
        if (data1 != null && data1 != "") {
          setItemList1([
            ...data1.listOfItem,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 3,
            },
          ]);
        }
        const data2 = await tripItemApi.getAllUser({
          pageIndex: 0,
          pageSize: 99999,
          categoryId: 4,
          tripId: tripId,
        });
        if (data2 != null && data2 != "") {
          setItemList2([
            ...data2.listOfItem,
            {
              itemId: 0,
              tripId: tripId,
              itemName: "",
              itemDescription: "",
              priceMin: "",
              quantity: "",
              categoryId: 4,
            },
          ]);
        }
      } catch (error) {
        console.log("Failed to fetch trip item", error);
      }
    })();
  }, []);
  return (
    <Grid container sx={{p:3}}>
      <Grid item xs={12}>
        <Typography variant="h4" marginBottom={2} sx={{ fontSize: "1.5 rem", fontWeight:700 }}>
          <PlaylistAddCheckOutlinedIcon /> Phần chuẩn bị cho chuyến đi
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            minWidth: 300,
            marginBottom: 1,
          }}
        >
          <CardHeader
            title="Đồ ăn vặt"
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
        <Card
          sx={{
            minWidth: 300,
            marginBottom: 1,
          }}
        >
          <CardHeader
            title="Nguyên liệu nấu ăn"
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
              {itemList1.map((item, index) => (
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
                        onChange={(e) => handleItemChange1(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={1}>
                      <Button
                        onClick={() => handleItemAdd1(item.itemId, index)}
                      >
                        <CheckCircleOutlineOutlinedIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button
                        color="error"
                        onClick={() => handleItemRemove1(item.itemId, index)}
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
                        onChange={(e) => handleItemChange1(e, index)}
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
                        onChange={(e) => handleItemChange1(e, index)}
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
        <Card
          sx={{
            minWidth: 300,
          }}
        >
          <CardHeader
            title="Đồ dùng cá nhân"
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
              {itemList2.map((item, index) => (
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
                        onChange={(e) => handleItemChange2(e, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                    <Grid item xs={12} sm={1}>
                      <Button
                        onClick={() => handleItemAdd2(item.itemId, index)}
                      >
                        <CheckCircleOutlineOutlinedIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button
                        color="error"
                        onClick={() => handleItemRemove2(item.itemId, index)}
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
                        onChange={(e) => handleItemChange2(e, index)}
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
                        onChange={(e) => handleItemChange2(e, index)}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Collapse>
          </div>
        </Card>
        <hr />
      </Grid>
    </Grid>
  );
};

export default Preparation;
