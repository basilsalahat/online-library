/* eslint-disable react/prop-types */
import { StyledCard } from "./Card.styled";

export default function Card({
  title,
  author = "N/A",
  category = "N/A",
  image,
}) {
  return (
    <StyledCard>
      <img src={image} alt="Book Photo" />
      <div>
        <p>{category}</p>
        <p>{title}</p>
        <p>{author}</p>
      </div>
    </StyledCard>
  );
}
