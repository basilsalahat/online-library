import { StyledNavbar } from "./Navbar.styled";
import Badge from "@mui/material/Badge";

export default function Navbar() {
  return (
    <StyledNavbar>
      <img src="/images/book.svg" alt="Book Logo" className="logo" />
      <ul>
        <li>
          <a href="#">books</a>
        </li>
      </ul>
      <Badge badgeContent={0} color="primary">
        <img src="/images/bell.svg" alt="bell Logo" className="logo" />
      </Badge>
    </StyledNavbar>
  );
}
