import { GlobalStyle } from "./components/styled/Global.styled";
import Navbar from "./components/navbar/Navabr";
import Body from "./components/body/Body";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Body />
    </>
  );
}
export default App;
