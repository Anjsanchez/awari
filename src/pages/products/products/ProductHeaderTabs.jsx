import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, LinearProgress } from "@material-ui/core";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";

const useStyles = makeStyles((theme) => ({
  roomHeader_container: {
    background: "#fff",
    borderBottom: "solid 1px #e0e0e0",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
}));

const ProductHeaderTabs = ({ onSelect, value }) => {
  //..
  const classes = useStyles();
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getProdCategory();
        const { listRecords } = data;

        const sorted = listRecords.sort((a, b) => a.name.localeCompare(b.name));

        setTimeout(() => {
          if (!isMounted()) return;

          setCategories([{ _id: 0, name: "All" }, ...sorted]);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setCategories({});
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
        {categories.map((n) => (
          <Tab label={n.name} key={n._id} value={n._id} />
        ))}
      </Tabs>
    </div>
  );
};

export default ProductHeaderTabs;
