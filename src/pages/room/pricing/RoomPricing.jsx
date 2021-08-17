import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import RoomPricingForm from "./RoomPricingForm";
import RoomPricingList from "./RoomPricingList";
import React, { useState, useEffect } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import RoomPricingDisplay from "./RoomPricingDisplay";
import RoomHeaderTabs from "./../rooms/RoomHeaderTabs";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getRoomPricings } from "../../../utils/services/pages/rooms/RoomPricing";
import { GetRoomWithPricing } from "./../../../utils/services/pages/rooms/RoomService";

const RoomPricing = () => {
  const isMounted = useMountedState();
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [searchRoom, setSearchRoom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  //RoomPricing
  const [roomPricingPerPage] = useState(5);
  const [roomPricing, setRoomPricing] = useState([]);
  const [filteredRoomPricings, setFilteredRoomPricings] = useState([]);

  // Get current posts
  const indexOfLastData = currentPage * roomPricingPerPage;
  const indexOfFirstData = indexOfLastData - roomPricingPerPage;
  const restrictedData = filteredRoomPricings.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const handleSearch = (e, value) =>
    value === null ? setSearchRoom("") : setSearchRoom(value.searchName);

  const handleSelectTabs = (event, newValue) => setTabValue(newValue);

  const handleDelete = () => {};

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleEditView = () => setShowForm(true);

  const handleAddView = () => {
    setSelectedRoom({});
    setShowForm(true);
  };
  const handleView = (room) => {
    setShowForm(false);
    setSelectedRoom(room);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedRoom({});
  };

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredRoomPricings((prevState) => {
      return [...prevState, obj];
    });

    setRoomPricing((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();

    const roomPricingx = [...filteredRoomPricings];
    const index = roomPricingx.findIndex((x) => x._id === obj._id);

    console.log("i", roomPricingx[index]);
    roomPricingx[index].room.searchName = obj.room.searchName;
    roomPricingx[index].capacity = obj.capacity;
    roomPricingx[index].sellingPrice = obj.sellingPrice;
    roomPricingx[index].isActive = obj.isActive;

    setFilteredRoomPricings(roomPricingx);
    setRoomPricing(roomPricingx);
  };

  useEffect(() => {
    //..
    async function fetchRooms() {
      try {
        const { data } = await GetRoomWithPricing();
        const { listRecords } = data;

        const sortedRoom = listRecords.sort((a, b) =>
          a.roomLongName.localeCompare(b.roomLongName)
        );

        setTimeout(() => {
          if (!isMounted()) return;

          setRooms(sortedRoom);
          setFilteredRooms(sortedRoom);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms([]);
          setFilteredRooms([]);
        };
      }
    }
    //..
    async function fetchData() {
      try {
        const { data } = await getRoomPricings();
        const { token, listRecords } = data;

        const sortedRoom = listRecords.sort((a, b) =>
          a.room.roomLongName.localeCompare(b.room.roomLongName)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setRoomPricing(sortedRoom);
          setFilteredRoomPricings(sortedRoom);
          setInitialLoadForm(true);
        }, 500);
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRoomPricing([]);
          setFilteredRoomPricings([]);
        };
      }
    }
    fetchRooms();
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //..
    function filterRoomPricing() {
      if (tabValue === 0) return setFilteredRoomPricings(roomPricing);

      const pricingx = roomPricing.filter(
        (n) => n.room.roomVariantId === tabValue
      );

      console.log("price", pricingx);
      setFilteredRoomPricings(pricingx);
    }

    function filterRooms() {
      paginate(null, 1);

      if (tabValue === 0) return setFilteredRooms(rooms);

      const roomsx = rooms.filter((n) => n.roomVariantId === tabValue);

      setFilteredRooms(roomsx);
    }

    filterRooms();
    filterRoomPricing();
  }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredRoomPricings([]);
    if (searchRoom === "") setTabValue(0);
    paginate(null, 1);

    roomPricing
      .filter((val) => {
        if (searchRoom === "") return val;
        if (val.room.searchName.toLowerCase() === searchRoom.toLowerCase())
          return val;

        return "";
      })
      .map((val, key) => {
        if (searchRoom === "") return setFilteredRoomPricings(roomPricing);
        return setFilteredRoomPricings((prevState) => {
          // console.log(object);
          return [...prevState, val];
        });
      });
  }, [searchRoom]); // eslint-disable-line react-hooks/exhaustive-deps

  const RenderVariantDisplay = () => {
    if (showForm)
      return (
        <RoomPricingForm
          data={selectedRoom}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedRoom.hasOwnProperty("_id")) return null;

    return (
      <RoomPricingDisplay
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        data={selectedRoom}
      />
    );
  };

  if (!initialLoadForm) return <Loader />;

  return (
    <>
      <FormHeader
        header="Pricing"
        second="Room Management"
        third="Pricing"
        navigate="/user-management/customers/new"
        SecondIcon={BsFillHouseDoorFill}
        isVisibleBtn={false}
      />

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <div
            style={{
              background: "#fff",
              paddingBottom: "15px",
            }}
          >
            <RoomHeaderTabs onSelect={handleSelectTabs} value={tabValue} />
            <MSearchBar
              onAdd={handleAddView}
              onSearch={handleSearch}
              data={filteredRooms}
              searchField="searchName"
            />
            <RoomPricingList
              data={restrictedData}
              onView={handleView}
              onDelete={handleDelete}
              onAdd={handleAddView}
            />
            <div style={{ marginTop: "15px" }}>
              <MPagination
                postsPerPage={roomPricingPerPage}
                totalPosts={filteredRoomPricings.length}
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

export default RoomPricing;
