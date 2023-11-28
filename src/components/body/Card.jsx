/* eslint-disable react/prop-types */
import { StyledCard } from "./Card.styled";
import noImage from "../../assets/images/no-image.png";
import PropTypes from "prop-types";

export default function Card({ details }) {
  Card.PropsTypes = {
    details: PropTypes.object,
  };
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
        {details.volumeInfo.categories ? (
          <p>{details.volumeInfo.categories}</p>
        ) : (
          <p>N/A</p>
        )}
        {details.volumeInfo.title ? (
          <p>{details.volumeInfo.title}</p>
        ) : (
          <p>N/A</p>
        )}
        {details.volumeInfo.authors ? (
          <p>{details.volumeInfo.authors}</p>
        ) : (
          <p>N/A</p>
        )}
        {details.searchInfo.textSnippet ? (
          <p>{details.searchInfo.textSnippet}</p>
        ) : (
          <p>N/A</p>
        )}
      </div>
    </StyledCard>
  );
}
