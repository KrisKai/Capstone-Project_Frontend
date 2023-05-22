import { Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { userApi } from "api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// dayjs.extend(utc);

export default function UserCreate() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState({
    username: "",
    password: "",
    retypePassword: "",
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    createDate: "",
    createBy: "",
    updateDate: "",
    updateBy: "",
  });

  useEffect(() => {
    if (!userId) return;
    // IFFE
    async function getUserDetail() {
      try {
        const data = await userApi.getById(userId);
        console.log(data)
        if (data !== null && data !== "") {
          data.birthday = data.birthday.substring(0, 10);
          data.retypePassword = data.password;
          setUser(data);
        } else {
          navigate("/admin/userList");
        }
      } catch (error) {
        console.log("Failed to fetch user details", error);
        if (error.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    }
    getUserDetail();
  }, [userId]);

  function gotoList() {
    navigate("/admin/userList");
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        View User
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Username"
            name="Username"
            label="Username"
            fullWidth
            value={user.username}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Fullname"
            name="Fullname"
            label="Full name"
            fullWidth
            value={user.fullname}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            variant="outlined"
            value={user.address}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Phone"
            name="Phone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={user.phone}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            id="Role"
            name="Role"
            label="Role"
            fullWidth
            variant="outlined"
            value={user.role}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="Birthday"
            name="Birthday"
            label="Birthday"
            fullWidth
            variant="outlined"
            value={user.birthday}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="CreateBy"
            name="CreateBy"
            label="Create By"
            fullWidth
            variant="outlined"
            value={user.createBy}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="CreateDate"
            name="CreateDate"
            label="Create Date"
            fullWidth
            variant="outlined"
            value={user.createDate}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {user.UpdateBy !== null ? (
          <>
            <Grid item xs={12} sm={3}>
              <TextField
                id="UpdateBy"
                name="UpdateBy"
                label="Update By"
                fullWidth
                variant="outlined"
                value={user.updateBy}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="UpdateDate"
                name="UpdateDate"
                label="Update Date"
                fullWidth
                variant="outlined"
                value={user.updateDate}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </>
        ):<Grid item xs={12} sm={6}></Grid>}

        <Grid item xs={12} sm={6}>
          <Button variant="outlined" onClick={gotoList}>
            Return to List
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
