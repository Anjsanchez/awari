import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReservationSteps from "./ReservationSteps";
import { store } from "../../utils/store/configureStore";
import { toggleHidden } from "../../utils/store/pages/RoomReservation";

const ReservationModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const HandleModalVisible = () => setModalVisible(!modalVisible);

  const HandleModalVisibleCancel = () => store.dispatch(toggleHidden());

  const isVisible = useSelector(
    (state) => state.entities.createReservation.isVisible
  );

  return (
    <>
      <Modal
        style={{ zIndex: 1201 }}
        title="Reservation"
        centered
        visible={isVisible}
        onOk={HandleModalVisible}
        onCancel={HandleModalVisibleCancel}
      >
        <ReservationSteps />
      </Modal>
    </>
  );
};

export default ReservationModal;
