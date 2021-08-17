import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import RoomVariantForm from "./RoomVariantForm";
import RoomVariantList from "./RoomVariantList";
import MDisplay from "./../../../common/MDisplay";
import React, { useEffect, useState } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import resortImg from "../../../assets/room/ifugao.jpg";
import MSearchBar from "../../../common/form/MSearchBar";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import FormHeader from "./../../../common/form/FormHeader";
import { getRoomVariants } from "../../../utils/services/pages/rooms/RoomVariantService";

const RoomVariants = () => {
  //..
  const isMounted = useMountedState();
  const [variantPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [variants, setVariants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVariant, setSearchVariant] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({});
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  // Get current posts
  const indexOfLastVariant = currentPage * variantPerPage;
  const indexOfFirstVariant = indexOfLastVariant - variantPerPage;
  const restrictedVariant = filteredVariants.slice(
    indexOfFirstVariant,
    indexOfLastVariant
  );

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getRoomVariants();
        const { token, listRecords } = data;

        const sortedVariant = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setVariants(sortedVariant);
          setFilteredVariants(sortedVariant);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setVariants([]);
          setFilteredVariants([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    paginate(null, 1);
    variants
      .filter((val) => {
        if (searchVariant === "") return val;
        if (val.name.toLowerCase().includes(searchVariant.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchVariant === "") return setFilteredVariants(variants);
        return setFilteredVariants([val]);
      });
  }, [searchVariant]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {};

  const handleView = (variant) => {
    setShowForm(false);
    setSelectedVariant(variant);
  };

  const handleEditView = () => setShowForm(true);

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredVariants((prevState) => {
      return [...prevState, obj];
    });

    setVariants((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSearch = (e, value) =>
    value === null ? setSearchVariant("") : setSearchVariant(value.name);

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedVariant({});
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const variantsx = [...filteredVariants];
    const index = variantsx.findIndex((x) => x._id === obj.id);

    variantsx[index] = { ...variantsx[index] };
    variantsx[index].name = obj.name;
    variantsx[index].isActive = obj.isActive;

    setFilteredVariants(variantsx);
    setVariants(variantsx);
  };

  const handleAddView = () => {
    setSelectedVariant({});
    setShowForm(true);
  };

  const RenderVariantDisplay = () => {
    if (showForm)
      return (
        <RoomVariantForm
          data={selectedVariant}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedVariant.hasOwnProperty("_id")) return null;

    return (
      <MDisplay
        data={selectedVariant}
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        label="room variant"
        image={resortImg}
      />
    );
  };

  if (!initialLoadForm) return <Loader />;

  return (
    <>
      <FormHeader
        header="Variants"
        second="Room Management"
        third="Variants"
        navigate="/user-management/customers/new"
        SecondIcon={BsFillHouseDoorFill}
        isVisibleBtn={false}
      />

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <MSearchBar
            onAdd={handleAddView}
            onSearch={handleSearch}
            data={variants}
            searchField="name"
          />
          <div style={{ background: "#fff", paddingBottom: "15px" }}>
            <RoomVariantList
              data={restrictedVariant}
              onView={handleView}
              onDelete={handleDelete}
              onAdd={handleAddView}
            />
            <div style={{ marginTop: "15px" }}>
              <MPagination
                postsPerPage={variantPerPage}
                totalPosts={filteredVariants.length}
                paginate={paginate}
                page={currentPage}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderVariantDisplay />
        </Grid>
      </Grid>
    </>
  );
};

export default RoomVariants;
