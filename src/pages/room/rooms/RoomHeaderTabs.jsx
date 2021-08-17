import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, LinearProgress } from "@material-ui/core";
import { getRoomVariants } from "./../../../utils/services/pages/rooms/RoomVariantService";

const useStyles = makeStyles((theme) => ({
  roomHeader_container: {
    background: "#fff",
    borderBottom: "solid 1px #e0e0e0",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
}));

const RoomHeaderTabs = ({ onSelect, value }) => {
  //..
  const classes = useStyles();
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [variants, setVariants] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getRoomVariants();
        const { listRecords } = data;

        const sortedVariant = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setTimeout(() => {
          if (!isMounted()) return;

          setVariants([{ _id: 0, name: "All" }, ...sortedVariant]);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setVariants({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <LinearProgress />;

  return (
    <div className={classes.roomHeader_container}>
      <Tabs
        value={value}
        onChange={onSelect}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        {variants.map((n) => (
          <Tab label={n.name} key={n._id} value={n._id} />
        ))}
      </Tabs>
    </div>
  );
};

export default RoomHeaderTabs;
