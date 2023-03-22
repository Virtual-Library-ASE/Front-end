import "./Book.css";
import { useParams } from "react-router-dom";
import { setCarouselDisplay } from "../../../store/action";
import { useDispatch } from "react-redux";

const MOCK_BOOK_DETAIL = {
  bookId: "123",
  title: "The Girls",
  url: "https://libbyapp.com/library/dlrcoco/curated-1239658/page-1/2823006",
  thumbnail:
    "https://ic.od-cdn.com/resize?type=auto&width=536&quality=80&force=true&height=715&url=%2FImageType-400%2F0211-1%2F%257B1C9D2597-FFA9-4C2E-91AE-86187ED06AA5%257DIMG400.JPG",
  author: "Emma Cline",
  category: "Novel",
  fontAmount: 230000,
  desc:
    "A gripping and dark fictionalised account of life inside the Manson family from one of the most exciting young voices in fiction.\n" +
    "\n" +
    "If you’re lost, they’ll find you…\n" +
    "\n" +
    "Evie Boyd is fourteen and desperate to be noticed.\n" +
    "\n" +
    "It’s the summer of 1969 and restless, empty days stretch ahead of her. Until she sees them. The girls. Hair long and uncombed, jewelry catching the sun. And at their centre, Suzanne, black-haired and beautiful.\n" +
    "\n" +
    "If not for Suzanne, she might not have gone. But, intoxicated by her and the life she promises, Evie follows the girls back to the decaying ranch where they live.\n" +
    "\n" +
    "Was there a warning? A sign of what was coming? Or did Evie know already that there was no way back?\n" +
    "\n" +
    "‘Taut, beautiful and savage, Cline’s novel demands your attention’ Guardian",
  ISBN: "1213132121231",
  language: "English",
  status: "Available",
  uploadTime: "2023.02.01",
  readAmount: 3270,
  recommendedAmount: 2312,
};
const BookHeader = (params) => {
  const detail = params.details;

  return (
    <>
      <div className="header h-60 text-color-white">
        <div className="content h-60 relative">
          <div className="info absolute bottom-4">
            <div className="author">{detail.author}</div>
            <div className="title text-3xl">{detail.title}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const BookBody = (params) => {
  const detail = params.details;

  const infoList = [
    {
      label: "Author: ",
      value: detail.author,
    },
    {
      label: "Font Amount: ",
      value: detail.fontAmount,
    },
    {
      label: "Language: ",
      value: detail.language,
    },
    {
      label: "Statue: ",
      value: detail.status,
    },
    {
      label: "ISBN: ",
      value: detail.ISBN,
    },
    {
      label: "Read Amount: ",
      value: detail.readAmount,
    },
    {
      label: "Upload time: ",
      value: detail.uploadTime,
    },
  ];

  return (
    <>
      <div className="body">
        <div className="content">
          <div className="basic flex">
            <div className="left pr-4">
              <p className="desc">{detail.desc}</p>

              <div className="text-base mt-4 leading-8">
                {infoList.map((info) => (
                  <div className="flex" key={info.label}>
                    <span className="label font-bold w-2/5">{info.label}</span>
                    <span>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="right relative">
              <div className="right-bd absolute">
                <div className="thumbnail">
                  <div className="img-container">
                    <img
                      src="https://ic.od-cdn.com/resize?type=auto&width=536&quality=80&force=true&height=715&url=%2FImageType-400%2F0211-1%2F%257B1C9D2597-FFA9-4C2E-91AE-86187ED06AA5%257DIMG400.JPG"
                      alt={detail.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Comment />
        </div>
      </div>
    </>
  );
};

const comments = [
  {
    id: 1,
    name: "John Doe",
    content: "Great article! Thanks for sharing.",
    comment_date: "2022-10-10",
    update_time: "2022-10-11 15:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "I found this article really helpful. Keep up the good work!",
    comment_date: "2022-10-12",
    update_time: "2022-10-12 08:45:00",
  },
  {
    id: 3,
    name: "Bob Johnson",
    content: "Thanks for this insightful article. Looking forward to more!",
    comment_date: "2022-10-13",
    update_time: "2022-10-13 11:15:00",
  },
  // Add more comments here
];

const Comment = () => {
  return (
    <>
      <div className="comment-list mt-20">
        <h2 className="text-2xl font-bold my-4">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment pb-2 mb-2">
            <div className="comment-name font-bold">{comment.name}</div>
            <div className="comment-content my-1">{comment.content}</div>
            <div className="comment-details text-sm">
              <span className="comment-post-time">
                Posted on {comment.update_time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Book = () => {
  // Hide Carousel
  const dispatch = useDispatch();
  setCarouselDisplay(false);
  dispatch(setCarouselDisplay(false));

  // Get route parameters
  const routerParams = useParams();
  console.log(routerParams.id); // {id: "2",name:"zora"}

  const bookDetail = MOCK_BOOK_DETAIL;

  return (
    <>
      <div className="book">
        <BookHeader details={bookDetail} />
        <BookBody details={bookDetail} />
      </div>
    </>
  );
};
export default Book;
