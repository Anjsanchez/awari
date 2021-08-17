import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  sideMenu_button: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 8px 12px 16px",
    margin: 0,
    fontWeight: 300,
    fontSize: "0.95rem",
    lineHeight: 1.75,
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#F8F9FE",
    },
  },
  sideMenu_icon: {
    fontSize: "19px",
  },
  sideMenu_button_child: {
    paddingLeft: "60px",
  },
  subChild_active: {
    backgroundColor: "#f8f9fe !important",
    fontWeight: 500,
    color: "rgb(86, 100, 210) !important",
  },
}));

const SubNav = (props) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const classes = useStyles();
  const { title, id, subNav, icon, headerPath, handleSelect, activeChildMenu } =
    props;

  const handleIconClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const RenderIconButtonWithLink = () => {
    if (headerPath)
      return (
        <Link
          to={headerPath}
          className="link"
          onClick={() => handleSelect(id)}
          id={id}
        >
          {<RenderIconButton />}
        </Link>
      );

    return <RenderIconButton />;
  };

  const RenderIconButton = () => {
    return (
      <IconButton
        className={`${classes.sideMenu_button}  ${
          activeChildMenu === id ? classes.subChild_active : ""
        }`}
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleIconClick}
      >
        <div className="sideMenu_container_iconLeft">
          <div className="sideMenu_subNav_icon">{icon}</div>
          <span
            className={`  ${
              activeChildMenu === id ? classes.subChild_active : ""
            }`}
          >
            {title}
          </span>
        </div>
        {subNav && (
          <div className="sideMenu_container_iconRight">
            {!showSubMenu ? (
              <BiChevronRight className={classes.sideMenu_icon} />
            ) : (
              <BiChevronDown className={classes.sideMenu_icon} />
            )}
          </div>
        )}
      </IconButton>
    );
  };

  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: "#6B778C" }}>
        <RenderIconButtonWithLink />

        <ul className={`sideMenu_ul_child ${!showSubMenu && "hidden"}`}>
          {subNav &&
            subNav.map((m) => (
              <li key={m.title} className="sideMenu_li_child">
                <Link
                  to={m.path}
                  className={`link `}
                  onClick={() => handleSelect(m.id)}
                  id={m.id}
                >
                  <IconButton
                    className={`${classes.sideMenu_button} ${
                      classes.sideMenu_button_child
                    } ${
                      activeChildMenu === m.id ? classes.subChild_active : ""
                    }`}
                    edge="start"
                    aria-label="menu"
                    color="primary"
                  >
                    <div className="sideMenu_container_iconLeftChild">
                      <span
                        className={`  ${
                          activeChildMenu === m.id
                            ? classes.subChild_active
                            : ""
                        }`}
                      >
                        {m.title}
                      </span>
                    </div>
                  </IconButton>
                </Link>
              </li>
            ))}
        </ul>
      </IconContext.Provider>
    </React.Fragment>
  );
};

export default SubNav;
