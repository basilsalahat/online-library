import Navbar from "./components/navbar/Navabr";
import Body from "./components/body/Body";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./components/styled/Global.styled.jsx";
import BookDetails from "./components/bookDetails/BookDetails.jsx";
import ErrorPage from "./components/errorPage/ErrorPage.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <GlobalStyle />
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Body />} />
            <Route
              path="/book/:id"
              element={<BookDetails />}
              errorElement={<ErrorPage />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
export default App;
