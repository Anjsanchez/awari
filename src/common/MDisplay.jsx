import React from "react";
import moment from "moment";
import MaterialButton from "./MaterialButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonGroup,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  half: {
    boxSizing: "border-box",
    display: "inline-block",
    textAlign: "center",
    width: "100%",
  },
  btn: {
    width: "50%",
  },
});

const MDisplay = ({ data, label, onCancel, onEdit, image }) => {
  const classes = useStyles();
  const { createdDate, user, name } = data;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Cluster Room"
          height="240"
          image={image}
          title="Cluster Room"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This {label} was created by {user.firstName} {user.lastName} on{" "}
            {moment(createdDate).format("MMMM Do, YYYY")}.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          className={classes.half}
        >
          <MaterialButton
            text="Cancel"
            color="secondary"
            className={classes.btn}
            onClick={onCancel}
          />
          <MaterialButton
            text="Edit"
            color="primary"
            className={classes.btn}
            onClick={onEdit}
          />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};
export default MDisplay;
