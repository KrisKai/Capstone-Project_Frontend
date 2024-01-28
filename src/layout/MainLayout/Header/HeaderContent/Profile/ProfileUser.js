import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// material-ui
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import { Transitions } from "components/Extend";
import { MainCard } from "components/Layout";

// assets
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import avatar1 from "assets/images/users/avatar-1.png";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getcurrentUserDTO,
  selectcurrentUserDTO,
} from "redux/modules/user/authenticate/authUserSlice";
import ProfileTabUser from "./ProfileTabUser";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const ProfileUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const currentUserDTO = useAppSelector(selectcurrentUserDTO);
  console.log(currentUserDTO)

  useEffect(() => {
    if (localStorage.getItem("access_token_user")) {
      dispatch(getcurrentUserDTO());
    }
  }, []);

  const handleLogout = async () => {
    // logout
    localStorage.removeItem("access_token_user");
    navigate("/");
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={currentUserDTO.avatar === null ? avatar1 : currentUserDTO.avatar}
            sx={{ width: 32, height: 32 }}
          />
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 180,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 150,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <Avatar
                              alt="profile user"
                              src={
                                currentUserDTO.avatar === null
                                  ? avatar1
                                  : currentUserDTO.avatar
                              }
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography variant="h6">
                                {currentUserDTO.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {currentUserDTO.role}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTabUser handleLogout={handleLogout} />
                        </TabPanel>
                        {/* <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel> */}
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ProfileUser;
