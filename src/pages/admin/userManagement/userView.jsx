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
    fldUsername: "",
    fldPassword: "",
    fldRetypePassword: "",
    fldRole: "",
    fldBirthday: "",
    fldEmail: "",
    fldFullname: "",
    fldPhone: "",
    fldAddress: "",
    fldCreateDate: "",
    fldCreateBy: "",
    fldUpdateDate: "",
    fldUpdateBy: "",
  });

  useEffect(() => {
    if (!userId) return;
    // IFFE
    async function getUserDetail() {
      try {
        const data = await userApi.getById(userId);
        console.log(data)
        if (data !== null && data !== "") {
          data.fldBirthday = data.fldBirthday.substring(0, 10);
          data.fldRetypePassword = data.fldPassword;
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
            id="fldUsername"
            name="fldUsername"
            label="Username"
            fullWidth
            value={user.fldUsername}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fldFullname"
            name="fldFullname"
            label="Full name"
            fullWidth
            value={user.fldFullname}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fldAddress"
            name="fldAddress"
            label="Address"
            fullWidth
            variant="outlined"
            value={user.fldAddress}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fldPhone"
            name="fldPhone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={user.fldPhone}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            id="fldRole"
            name="fldRole"
            label="Role"
            fullWidth
            variant="outlined"
            value={user.fldRole}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="fldBirthday"
            name="fldBirthday"
            label="Birthday"
            fullWidth
            variant="outlined"
            value={user.fldBirthday}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fldEmail"
            name="fldEmail"
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            value={user.fldEmail}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="fldCreateBy"
            name="fldCreateBy"
            label="Create By"
            fullWidth
            variant="outlined"
            value={user.fldCreateBy}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="fldCreateDate"
            name="fldCreateDate"
            label="Create Date"
            fullWidth
            variant="outlined"
            value={user.fldCreateDate}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {user.fldUpdateBy !== null ? (
          <>
            <Grid item xs={12} sm={3}>
              <TextField
                id="fldUpdateBy"
                name="fldUpdateBy"
                label="Update By"
                fullWidth
                variant="outlined"
                value={user.fldUpdateBy}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="fldUpdateDate"
                name="fldUpdateDate"
                label="Update Date"
                fullWidth
                variant="outlined"
                value={user.fldUpdateDate}
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
