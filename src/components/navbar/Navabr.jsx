import { StyledNavbar } from "./Navbar.styled";
import Badge from "@mui/material/Badge";
import bellImage from "../../assets/images/bell.svg";
import bookImage from "../../assets/images/book.svg";

export default function Navbar() {
  return (
    <StyledNavbar>
      <img src={bookImage} alt="Book Logo" className="logo" />
      <ul>
        <li>
          <a href="#">books</a>
        </li>
      </ul>
      <Badge badgeContent={0} color="primary">
        <img src={bellImage} alt="bell Logo" className="logo" />
      </Badge>
    </StyledNavbar>
  );
}
