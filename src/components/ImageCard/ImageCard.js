import "./ImageCard.css";

function ImageCard(props) {
  return (
    <div className="card cursor-pointer mx-4">
      <figure className="figure">
        <img
          src={props.src}
          className="max-w-full align-top"
          alt="book-cover"
        />
        <div className="cover">
          <figcaption className="">
            <h3 className="title font-normal leading-none mt-0.5">
              {" "}
              {props.title}
            </h3>
            <h3 className="hover">Read</h3>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

export default ImageCard;