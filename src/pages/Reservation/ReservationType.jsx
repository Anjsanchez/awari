import React, { useEffect, useState, useRef } from "react";
import { Select } from "antd";
import { useSnackbar } from "notistack";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import "./css/ReservationType.css";
import { reservationTypeAdded } from "../../utils/store/pages/RoomReservation";
import { useSelector } from "react-redux";
import { Input } from "antd";
import { GetReservationTypes } from "./../../utils/services/pages/reservation/ReservationType";

const ReservationType = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const [reservationTypes, setReservationTypes] = useState([]);

  const [selectedType, setSelectedType] = useState({
    name: "",
    remark: "",
  });

  const onSelectChange = (value) =>
    setSelectedType((n) => ({ ...n, name: value }));

  const handleRemarkChange = (e) =>
    setSelectedType((n) => ({ ...n, remark: e.target.value }));

  const typeInStore = useSelector(
    (state) => state.entities.createReservation.reservation.type
  );

  useEffect(() => {
    store.dispatch(reservationTypeAdded(selectedType));
  }, [selectedType]);

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await GetReservationTypes();

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setReservationTypes(sortedPayment);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the reservation type in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    function initialLoadValues() {
      if (typeInStore.name !== "" || typeInStore.name !== null)
        return setSelectedType({
          name: typeInStore.name,
          remark: typeInStore.remark,
        });
    }

    populateReservationTypes();
    initialLoadValues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const conditionA = () => {
    if (
      selectedType.name === null ||
      selectedType.name === "" ||
      selectedType.name === undefined
    )
      return null;

    const typeInlower = selectedType.name.toLowerCase();

    if (
      typeInlower === "day tour" ||
      typeInlower === "walk in" ||
      typeInlower === "restaurant"
    )
      return null;

    return (
      <div className="remark__wrapper">
        <label htmlFor="remark">Remark</label>
        <div className="remark-input__wrapper">
          <Input
            id="remark"
            size="large"
            key="remark"
            value={selectedType.remark}
            onChange={handleRemarkChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="reservationtype-container">
      <Select
        className="reservationtype__select"
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onSelectChange}
        value={selectedType.name}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {reservationTypes.map((n) => (
          <Select.Option value={n.name} key={n._id}>
            {n.name}
          </Select.Option>
        ))}
      </Select>
      {conditionA()}
    </div>
  );
});

export default ReservationType;
