/* eslint-disable react/prop-types */
import { StyledCard } from "./Card.styled";
import noImage from "../../assets/images/no-image.png";
import PropTypes from "prop-types";

export default function Card({ details }) {
  Card.PropsTypes = {
    details: PropTypes.object,
  };

  function isEmpty(value) {
    return value ? value : "N/A";
  }
  return (
    <StyledCard>
      <img
        src={
          !details.volumeInfo.imageLinks
            ? noImage
            : details.volumeInfo.imageLinks.thumbnail
        }
        alt="Book Photo"
      />
      <div>
        <p>{isEmpty(details.volumeInfo.title)}</p>
        <p>{isEmpty(details.volumeInfo.authors)}</p>
        <p>{isEmpty(details.searchInfo.textSnippet)}</p>
      </div>
    </StyledCard>
  );
}
