import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./utils/store/configureStore";
ReactDOM.render(
  <>
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </SnackbarProvider>
  </>,

  document.getElementById("root")
);
