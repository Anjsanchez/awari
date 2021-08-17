import RoomForm from "./RoomForm";
import RoomsList from "./RoomsList";
import { useSnackbar } from "notistack";
import RoomDisplay from "./RoomDisplay";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import RoomHeaderTabs from "./RoomHeaderTabs";
import React, { useState, useEffect } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getRooms } from "../../../utils/services/pages/rooms/RoomService";

const Rooms = () => {
  const [roomPerPage] = useState(5);
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

  // Get current posts
  const indexOfLastData = currentPage * roomPerPage;
  const indexOfFirstData = indexOfLastData - roomPerPage;
  const restrictedData = filteredRooms.slice(indexOfFirstData, indexOfLastData);

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

    console.log("added!", obj);
    setFilteredRooms((prevState) => {
      return [...prevState, obj];
    });

    setRooms((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const roomsx = [...filteredRooms];
    const index = roomsx.findIndex((x) => x._id === obj.id);

    roomsx[index] = { ...roomsx[index] };
    roomsx[index].roomLongName = obj.roomLongName;
    roomsx[index].searchName = obj.searchName;
    roomsx[index].numberOfRooms = obj.numberOfRooms;
    roomsx[index].isAllowExtraPax = obj.isAllowExtraPax;
    roomsx[index].isPerPaxRoomType = obj.isPerPaxRoomType;
    roomsx[index].roomVariantId = obj.roomVariantId;
    roomsx[index].isActive = obj.isActive;

    setFilteredRooms(roomsx);
    setRooms(roomsx);
  };

  useEffect(() => {
    paginate(null, 1);

    if (tabValue === 0) return setFilteredRooms(rooms);

    const bigCities = rooms.filter((city) => city.roomVariantId === tabValue);

    setFilteredRooms(bigCities);
  }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getRooms();
        const { token, listRecords } = data;

        const sortedRoom = listRecords.sort((a, b) =>
          a.roomLongName.localeCompare(b.roomLongName)
        );

        store.dispatch(writeToken({ token }));

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
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchRoom === "") setTabValue(0);
    paginate(null, 1);

    rooms
      .filter((val) => {
        if (searchRoom === "") return val;
        if (val.searchName.toLowerCase().includes(searchRoom.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchRoom === "") return setFilteredRooms(rooms);
        return setFilteredRooms([val]);
      });
  }, [searchRoom]); // eslint-disable-line react-hooks/exhaustive-deps

  const RenderDisplay = () => {
    if (showForm)
      return (
        <RoomForm
          data={selectedRoom}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedRoom.hasOwnProperty("_id")) return null;

    return (
      <RoomDisplay
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
        header="Rooms"
        second="Room Management"
        third="Rooms"
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
            <RoomsList
              data={restrictedData}
              onView={handleView}
              onDelete={handleDelete}
              onAdd={handleAddView}
            />
            <div style={{ marginTop: "15px" }}>
              <MPagination
                postsPerPage={roomPerPage}
                totalPosts={filteredRooms.length}
                paginate={paginate}
                page={currentPage}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderDisplay />
        </Grid>
      </Grid>
    </>
  );
};
export default Rooms;
