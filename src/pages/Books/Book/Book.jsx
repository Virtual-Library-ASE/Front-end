import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { underscoreToCamelCaseKeys } from "../../../resources/js/common";
import { setCarouselDisplay, setFooterDisplay } from "../../../store/action";
import { getBookByIdApi } from "../../../api/api";

import BubblyBtn from "../../../components/BubblyBtn/BubblyBtn";
import BookReserveModal from "./BookReserveModal";
import "./Book.css";

const BookHeader = (params) => {
  const detail = params.details;
  const navigate = useNavigate();

  return (
    <>
      <div className="header h-60 text-color-white">
        <div className="content h-60 relative">
          <div className="return absolute p-3">
            <div
              className="iconBox cursor-pointer"
              onClick={() => navigate(-1)}
            ></div>
          </div>

          <div className="info absolute bottom-4">
            <div className="author">{detail.author}</div>
            <div className="title text-3xl">{detail.bookName}</div>
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
      label: "State: ",
      value: detail.status ? "Rent Available" : "Rent Unavailable",
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
            <div className="right">
              <div className="right-bd relative">
                <div className="thumbnail">
                  <div className="img-container">
                    <img src={detail.thumbnail} alt={detail.title} />
                  </div>
                </div>

                <div className="btn-group mt-4">
                  <BubblyBtn
                    text="Rent this book"
                    handleEvent={() => {
                      params.handleReserveModal(true);
                    }}
                  />
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
  // Show Carousel
  const dispatch = useDispatch();
  const [bookDetail, setBookDetail] = useState({});

  // Get route parameters
  const routerParams = useParams();

  useEffect(() => {
    getBookByIdApi(routerParams.id)
      .then((res) => {
        if (res.status === 200 && JSON.stringify(res.data) !== "{}") {
          let resData = underscoreToCamelCaseKeys(res.data);
          setBookDetail({
            ...resData,
            title: resData["book_name"],
            url: resData["book_url"],
          });
        } else {
          console.log("Error: res.msg");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(false));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  const [isReserve, setReserveModal] = useState(false);
  const handleReserveModal = (bool) => {
    setReserveModal(bool);
  };

  const updateBookState = (book) => {};

  return (
    <>
      <div className="book" style={{ marginTop: "-30px" }}>
        <BookHeader details={bookDetail} />
        <BookBody
          details={bookDetail}
          handleReserveModal={handleReserveModal}
        />

        <BookReserveModal
          isShow={isReserve}
          bookDetail={bookDetail}
          updateBookState={updateBookState}
          handleReserveModal={handleReserveModal}
        ></BookReserveModal>
      </div>
    </>
  );
};
export default Book;
