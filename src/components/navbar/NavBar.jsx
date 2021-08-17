import "./NavBar.css";
import me from "../../assets/anj.jpg";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import { IconContext } from "react-icons";
import Modal from "@material-ui/core/Modal";
import { RiNotification3Line } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import * as auth from "../../utils/services/authServices";
import {
  Avatar,
  Badge,
  IconButton,
  Hidden,
  Fade,
  Backdrop,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [iconAnchor, setIconAnchor] = useState(null);

  const handleClick = (event) => {
    setIconAnchor(event.currentTarget);
  };

  const handleCloseEl = () => {
    setIconAnchor(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = () => (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open} direction="left" mountOnEnter unmountOnExit>
          <SideBar />
        </Fade>
      </Modal>
    </>
  );

  if (!auth.IsLoggedIn()) return null;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navBar_container">
          <div className="navBar_iconLeftContainer">
            <div to="#" className="navbar_iconLeft">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleOpen}
              >
                <FaBars />
              </IconButton>
            </div>
          </div>
          <div className="navBar_iconRightContainer">
            <div className="navbar_iconRight">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="navbar_iconBtn"
              >
                <Badge badgeContent={4} color="secondary">
                  <RiNotification3Line />
                </Badge>
              </IconButton>
            </div>
            <div className="navbar_ImageRight">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="simple-menu"
                onClick={handleClick}
              >
                <Avatar alt="Cindy Baker" src={me} />
              </IconButton>
            </div>
          </div>
        </div>

        <Hidden lgUp>
          <Transition />
        </Hidden>

        <Hidden mdDown>
          <SideBar />
        </Hidden>

        <Menu
          id="simple-menu"
          anchorEl={iconAnchor}
          keepMounted
          open={Boolean(iconAnchor)}
          onClose={handleCloseEl}
        >
          <MenuItem>My profile</MenuItem>
          <MenuItem onClick={handleCloseEl}>
            <Link to="/a/logout" className="link">
              Log out
            </Link>
          </MenuItem>
        </Menu>
      </IconContext.Provider>
    </>
  );
};

export default NavBar;
