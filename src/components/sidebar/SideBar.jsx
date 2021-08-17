import React, { useState } from "react";
import { Avatar, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import me from "../../assets/anj.jpg";
import awari from "../../assets/awari.jpg";
import { sideBarData } from "./sideBarData";
import SubNav from "./SubNav";
import "./SideBar.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  sidebar_container: {
    overflowY: "auto",
    flex: "1 1",
    [theme.breakpoints.up("lg")]: {
      top: "65px",
    },
  },
}));

const SideBar = React.forwardRef(() => {
  const classes = useStyles();
  const [activeChildMenu, setActiveChildMenu] = useState(0);

  const handleSetActiveChildList = (btn) => {
    setActiveChildMenu(btn);
  };

  return (
    <>
      <Paper
        square
        elevation={3}
        className={`sidebar_container on-scrollbar ${classes.sidebar_container}`}
      >
        <div className="sideBar_logo">
          <Avatar alt="Cindy Baker" src={awari} className={classes.large} />
        </div>
        <div className="userInfo_mainContainer">
          <div className="userInfo_container">
            <div className="userInfo_image">
              <Avatar alt="Cindy Baker" src={me} />
            </div>
            <div className="userInfo_nameContainer">
              <span className="userInfo_name">Angelo Sanchez</span>
              <span className="userInfo_role">Administartor</span>
            </div>
          </div>
        </div>
        <Divider />

        <div className="sideMenuBar_mainContainer">
          {sideBarData.map((n) => (
            <div key={n.title} className="sideMenubar_container">
              <span className="sideMenu_container-title">{n.title}</span>
              <ul className="sideMenu_ul">
                <li className="sideMenu_li">
                  {n.subNav.map((m) => (
                    <SubNav
                      id={m.id}
                      key={m.subTitle}
                      title={m.subTitle}
                      subNav={m.subNav}
                      icon={m.icon}
                      headerPath={m.path}
                      handleSelect={handleSetActiveChildList}
                      activeChildMenu={activeChildMenu}
                    />
                  ))}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Paper>
    </>
  );
});

export default SideBar;
