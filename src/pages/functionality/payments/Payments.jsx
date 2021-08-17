import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import { RiBankCardFill } from "react-icons/ri";
import resort from "../../../assets/room/hut.jpg";
import MDisplay from "./../../../common/MDisplay";
import React, { useState, useEffect } from "react";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getPayments } from "./../../../utils/services/pages/functionality/PaymentService";

const Payments = () => {
  const isMounted = useMountedState();
  const [paymentPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [payment, setPayment] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [searchPayment, setSearchPayment] = useState("");
  const [selectedPayment, setSelectedPayment] = useState({});
  const [filteredPayment, setFilteredPayment] = useState([]);

  // Get current posts
  const indexOfLastPayment = currentPage * paymentPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentPerPage;
  const restrictedPayment = filteredPayment.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getPayments();
        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setPayment(sortedPayment);
          setFilteredPayment(sortedPayment);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setPayment([]);
          setFilteredPayment([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    paginate(null, 1);
    payment
      .filter((val) => {
        if (searchPayment === "") return val;
        if (val.name.toLowerCase().includes(searchPayment.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchPayment === "") return setFilteredPayment(payment);
        return setFilteredPayment([val]);
      });
  }, [searchPayment]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {};

  const handleView = (payment) => {
    setShowForm(false);
    setSelectedPayment(payment);
  };

  const handleEditView = () => setShowForm(true);

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredPayment((prevState) => {
      return [...prevState, obj];
    });

    setPayment((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSearch = (e, value) =>
    value === null ? setSearchPayment("") : setSearchPayment(value.name);

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedPayment({});
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const paymentx = [...filteredPayment];
    const index = paymentx.findIndex((x) => x._id === obj.id);

    paymentx[index] = { ...paymentx[index] };
    paymentx[index].name = obj.name;
    paymentx[index].isActive = obj.isActive;
    paymentx[index].isNeedRefNumber = obj.isNeedRefNumber;

    setFilteredPayment(paymentx);
    setPayment(paymentx);
  };

  const handleAddView = () => {
    setSelectedPayment({});
    setShowForm(true);
  };

  const RenderPaymentDisplay = () => {
    if (showForm)
      return (
        <PaymentForm
          data={selectedPayment}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );
    if (!selectedPayment.hasOwnProperty("_id")) return null;

    return (
      <MDisplay
        data={selectedPayment}
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        label="payment type"
        image={resort}
      />
    );
  };

  if (!initialLoadForm) return <Loader />;

  return (
    <>
      <FormHeader
        header="Payments"
        second="System Functionality"
        third="Payments"
        navigate="/"
        SecondIcon={RiBankCardFill}
        isVisibleBtn={false}
      />

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <MSearchBar
            onAdd={handleAddView}
            onSearch={handleSearch}
            data={payment}
            searchField="name"
          />
          <div style={{ background: "#fff", paddingBottom: "15px" }}>
            <PaymentList
              data={restrictedPayment}
              onView={handleView}
              onDelete={handleDelete}
              onAdd={handleAddView}
            />
            <div style={{ marginTop: "15px" }}>
              <MPagination
                postsPerPage={paymentPerPage}
                totalPosts={filteredPayment.length}
                paginate={paginate}
                page={currentPage}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderPaymentDisplay />
        </Grid>
      </Grid>
    </>
  );
};

export default Payments;
