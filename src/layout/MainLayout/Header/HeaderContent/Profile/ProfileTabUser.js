import PropTypes from "prop-types";
import React, { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  styled,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// assets
import {
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProfileViewUser from "pages/user/authentication/profile/ProfileViewUser";
import ProfileEditUser from "pages/user/authentication/profile/ProfileEditUser";
import ProfileChangePasswordUser from "pages/user/authentication/profile/ProfileChangePasswordUser";
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 500,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ProfileTabUser = ({ handleLogout }) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openChange, setOpenChange] = useState(false);
  const handleOpenChange = () => setOpenChange(true);
  const handleCloseChange = () => setOpenChange(false);

  function handleEditModal(data) {
    if (data === true) {
      handleOpenEdit();
    } else {
      handleCloseEdit();
    }
  }

  function handleChangeModal(data) {
    if (data === true) {
      handleOpenChange();
    } else {
      handleCloseChange();
    }
  }

  return (
    <List
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      {/* <ListItemButton selected={selectedIndex === 0} onClick={handleOpenView}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 0} onClick={handleOpenView}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Thông tin" />
      </ListItemButton>

      {/* <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 1} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>

      <BootstrapDialog
        onClose={handleCloseView}
        aria-labelledby="customized-dialog-title"
        open={openView}
        sx={{ minWidth: "700px" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseView}
        >
          <Typography variant="h4">Thông tin cá nhân</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProfileViewUser handleCallback={handleEditModal} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOpenChange}>
            Đổi mật khẩu
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* modal Edit */}
      <BootstrapDialog
        onClose={handleCloseEdit}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
        sx={{ minWidth: "700px" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseEdit}
        >
          <Typography variant="h4">Chỉnh sửa thông tin</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProfileEditUser handleCallback={handleEditModal} />
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleCloseChange}
        aria-labelledby="customized-dialog-title"
        open={openChange}
        sx={{ minWidth: "700px" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseChange}
        >
          <Typography variant="h4">Đổi mật khẩu</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProfileChangePasswordUser handleCallback={handleChangeModal} />
        </DialogContent>
      </BootstrapDialog>
    </List>
  );
};

ProfileTabUser.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTabUser;
