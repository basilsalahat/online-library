import { useRouteError } from "react-router";
import StyledErrorPage from "./ErrorPage.styled.jsx";

function ErrorPage() {
  const error = useRouteError();
  return (
    <StyledErrorPage>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.message}</p>
    </StyledErrorPage>
  );
}

export default ErrorPage;
