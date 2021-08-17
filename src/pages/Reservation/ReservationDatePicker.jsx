import React from "react";
import { DatePicker } from "antd";
import "./css/ReservationDatePicker.css";
import { BsArrowRight } from "react-icons/bs";
import moment from "moment";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;

const ReservationDatePicker = () => {
  //

  const disabledDate = (d) => d + 2 && d + 5 < 1 + moment().startOf("day");

  const typeInStore = useSelector(
    (state) => state.entities.createReservation.reservation
  );

  const RenderRangePicker = () => {
    return (
      <div className="header__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor="rangePicker">CHECK-IN</label>
          <label htmlFor="rangePicker">CHECKOUT</label>
        </div>
        <RangePicker
          id="rangePicker"
          suffixIcon={null}
          separator={<BsArrowRight />}
          disabledDate={disabledDate}
          dateRender={(current) => {
            return (
              <div className="ant-picker-cell-inner">{current.date()}</div>
            );
          }}
        />
      </div>
    );
  };

  const RenderDatePicker = () => {
    return (
      <div className="header__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor="datePicker">CHECK-IN</label>
        </div>
        <DatePicker
          id="datePicker"
          suffixIcon={null}
          separator={<BsArrowRight />}
          disabledDate={disabledDate}
        />
      </div>
    );
  };
  const typeCondition = () => {
    const { name, remark } = typeInStore.type;

    if (name === "Day Tour" || name === "Restaurant")
      return <RenderDatePicker />;

    return <RenderRangePicker />;
  };

  return <>{typeCondition()}</>;
};

export default ReservationDatePicker;
