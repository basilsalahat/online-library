import StyledBookDetails from "./BookDetails.styled";
import Navbar from "../navbar/Navabr";
import { useLocation } from "react-router-dom";

function BookDetails() {
  const details = useLocation().state?.details;
  return (
    <>
      <Navbar />
      <StyledBookDetails>
        <header>
          <div>
            <h1>{details.volumeInfo.title}</h1>
            <h2>{details.volumeInfo.subtitle}</h2>
            <p>
              By{" "}
              <span className="publisher">{details.volumeInfo.authors[0]}</span>
              &nbsp;·&nbsp;
              <span className="publishYear">
                {details.volumeInfo.publishedDate.split("-")[0]}
              </span>
            </p>
          </div>
          <div className="photoContainer">
            <img
              src={details.volumeInfo.imageLinks.thumbnail}
              alt="book image"
            />
          </div>
        </header>
        <div className="extraInformation">
          <div className="aboutThisEdition">
            <h3>About this edition</h3>
            <p>
              Page Count <span>{details.volumeInfo.pageCount}</span>
            </p>
            <p>
              Print Type <span>{details.volumeInfo.printType}</span>
            </p>
            <h4>Description</h4>
            <p>{details.volumeInfo.description}</p>
          </div>
          <div className="aboutTheWork">
            <h3>About the work</h3>
            <p>
              Originally published:
              <span>{details.volumeInfo.publishedDate}</span>
            </p>
            <p>
              Publisher:
              <span>{details.volumeInfo.publisher}</span>
            </p>
            <p>
              Category:
              <span>{details.volumeInfo.categories}</span>
            </p>
          </div>
        </div>
      </StyledBookDetails>
    </>
  );
}

export default BookDetails;
