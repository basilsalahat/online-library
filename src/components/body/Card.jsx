/* eslint-disable react/prop-types */
import { StyledCard } from "./Card.styled";
import noImage from "../../assets/images/no-image.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({ details }) {
  Card.PropsTypes = {
    details: PropTypes.object,
  };
  function isEmpty(value) {
    return value ? value.toString().toLowerCase() : "N/A";
  }
  return (
    <StyledCard>
      <Link to={`book/${details.id}`} state={{details}}>
        <img
          src={
            !details.volumeInfo.imageLinks
              ? noImage
              : details.volumeInfo.imageLinks.thumbnail
          }
          alt="Book Photo"
        />
        <div>
          <p>{isEmpty(details.volumeInfo.categories)}</p>
          <p>{isEmpty(details.volumeInfo.title)}</p>
          <p>{isEmpty(details.volumeInfo.authors)}</p>
          <p>
            {!details.searchInfo
              ? "There is no description"
              : details.searchInfo.textSnippet}
          </p>
        </div>
      </Link>
    </StyledCard>
  );
}
