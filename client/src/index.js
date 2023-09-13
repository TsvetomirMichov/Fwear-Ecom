import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store ,persistor } from "./redux/store";
import { Provider } from "react-redux";
//import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material";
import "./main.css"
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body3",
          },
          styles: {
            fontSize: 20,
            textTransform: 'uppercase',
            

          },
        },
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 20,
          }
        }
      ]
    },
  }


});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <ThemeProvider theme={theme}>
    <PersistGate loading={"loading"} persistor={persistor}>
        <App />
      </PersistGate>
    </ThemeProvider>
      </Provider>
  </React.StrictMode>
);
