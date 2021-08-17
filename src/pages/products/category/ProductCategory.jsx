import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import Loader from "./../../../common/Loader";
import MDisplay from "./../../../common/MDisplay";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import resortImg from "../../../assets/room/skybar.jpg";
import ProductCategoryForm from "./ProductCategoryForm";
import ProductCategoryList from "./ProductCategoryList";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";

const ProductCategory = () => {
  const isMounted = useMountedState();
  const [categoryPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [prodCategory, setProdCategory] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [searchProdCategory, setSearchProdCategory] = useState("");
  const [selectedProdCategory, setSelectedProdCategory] = useState({});
  const [filteredProdCategory, setFilteredProdCategory] = useState([]);

  // Get current posts
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const restrictedCategory = filteredProdCategory.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getProdCategory();
        const { token, listRecords } = data;

        const sortedCategory = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setProdCategory(sortedCategory);
          setFilteredProdCategory(sortedCategory);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setProdCategory([]);
          setFilteredProdCategory([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    paginate(null, 1);
    prodCategory
      .filter((val) => {
        if (searchProdCategory === "") return val;
        if (val.name.toLowerCase().includes(searchProdCategory.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchProdCategory === "")
          return setFilteredProdCategory(prodCategory);
        return setFilteredProdCategory([val]);
      });
  }, [searchProdCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {};

  const handleView = (category) => {
    setShowForm(false);
    setSelectedProdCategory(category);
  };

  const handleEditView = () => setShowForm(true);

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredProdCategory((prevState) => {
      return [...prevState, obj];
    });

    setProdCategory((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSearch = (e, value) =>
    value === null
      ? setSearchProdCategory("")
      : setSearchProdCategory(value.name);

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedProdCategory({});
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const categoryx = [...filteredProdCategory];
    const index = categoryx.findIndex((x) => x._id === obj.id);

    categoryx[index] = { ...categoryx[index] };
    categoryx[index].name = obj.name;
    categoryx[index].isActive = obj.isActive;

    setFilteredProdCategory(categoryx);
    setProdCategory(categoryx);
  };

  const handleAddView = () => {
    setSelectedProdCategory({});
    setShowForm(true);
  };

  const RenderCategoryDisplay = () => {
    if (showForm)
      return (
        <ProductCategoryForm
          data={selectedProdCategory}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedProdCategory.hasOwnProperty("_id")) return null;

    return (
      <MDisplay
        data={selectedProdCategory}
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        label="product category"
        image={resortImg}
      />
    );
  };

  if (!initialLoadForm) return <Loader />;

  return (
    <>
      <FormHeader
        header="Category"
        second="Product Management"
        third="Category"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <MSearchBar
            onAdd={handleAddView}
            onSearch={handleSearch}
            data={prodCategory}
            searchField="name"
          />
          <div style={{ background: "#fff", paddingBottom: "15px" }}>
            <ProductCategoryList
              data={restrictedCategory}
              onView={handleView}
              onDelete={handleDelete}
              onAdd={handleAddView}
            />
            <div style={{ marginTop: "15px" }}>
              <MPagination
                postsPerPage={categoryPerPage}
                totalPosts={filteredProdCategory.length}
                paginate={paginate}
                page={currentPage}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderCategoryDisplay />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductCategory;
