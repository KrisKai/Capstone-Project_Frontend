import {
  IconButton,
  Button,
  Card,
  Collapse,
  Typography,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { toast } from "react-toastify";
import userTripItemApi from "api/user/trip/item/userTripItemApi";

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
      const reponse = await userTripItemApi.delete(itemId || "");
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
      const reponse = await userTripItemApi.create(itemList[index]);
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
      const reponse = await userTripItemApi.update(itemList[index]);
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
      const reponse = await userTripItemApi.delete(itemId || "");
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
      const reponse = await userTripItemApi.create(itemList1[index]);
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
      const reponse = await userTripItemApi.update(itemList1[index]);
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
      const reponse = await userTripItemApi.delete(itemId || "");
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
      const reponse = await userTripItemApi.create(itemList2[index]);
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
      const reponse = await userTripItemApi.update(itemList2[index]);
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
        const data = await userTripItemApi.getAll({
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
        const data1 = await userTripItemApi.getAll({
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
        const data2 = await userTripItemApi.getAll({
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
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          marginBottom={2}
          sx={{ fontSize: "1.5 rem", fontWeight: 700 }}
        >
          <PlaylistAddCheckOutlinedIcon /> Phần chuẩn bị cho chuyến đi
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ p: 2 }}>
        <Card
          sx={{
            minWidth: 300,
            marginBottom: 1,
          }}
        >
          <Grid container sx={{ pb: 1 }}>
            <Grid item xs={12} sm={0.5}>
              <IconButton
                onClick={() => setOpenOverview(!openOverview)}
                aria-label="expand"
                size="small"
              >
                {openOverview ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={11} pt={0.5}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "700", fontSize: "15px", marginLeft: 1 }}
              >
                Đồ ăn vặt
              </Typography>
            </Grid>
          </Grid>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} sx={{ p: 2 }}>
        <Card
          sx={{
            minWidth: 300,
            marginBottom: 1,
          }}
        >
          <Grid container sx={{ pb: 1 }}>
            <Grid item xs={12} sm={0.5}>
              <IconButton
                onClick={() => setOpenOverview2(!openOverview2)}
                aria-label="expand"
                size="small"
              >
                {openOverview2 ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={11} pt={0.5}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "700", fontSize: "15px", marginLeft: 1 }}
              >
                Nguyên liệu nấu ăn
              </Typography>
            </Grid>
          </Grid>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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

      <Grid item xs={12} sx={{ p: 2 }}>
        <Card
          sx={{
            minWidth: 300,
          }}
        >
          <Grid container sx={{ pb: 1 }}>
            <Grid item xs={12} sm={0.5}>
              <IconButton
                onClick={() => setOpenOverview3(!openOverview3)}
                aria-label="expand"
                size="small"
              >
                {openOverview3 ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={11} pt={0.5}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "700", fontSize: "15px", marginLeft: 1 }}
              >
                Đồ dùng cá nhân
              </Typography>
            </Grid>
          </Grid>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
