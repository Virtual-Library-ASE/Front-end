import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { underscoreToCamelCaseKeys } from "../../../resources/js/common";
import { setCarouselDisplay, setFooterDisplay } from "../../../store/action";
import { getBookByIdApi } from "../../../api/api";

import { LeftOutlined } from "@ant-design/icons";
import BubblyBtn from "../../../components/BubblyBtn/BubblyBtn";
import BookReserveModal from "./BookReserveModal";
import Comment from "./Comment";
import "./Book.css";
import { message } from "antd";

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
            >
              <LeftOutlined className="text-2xl" title="Return" />
            </div>
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
  const details = params.details;

  const infoList = [
    {
      label: "Author: ",
      value: details.author,
    },
    {
      label: "Font Amount: ",
      value: details.fontAmount,
    },
    {
      label: "Language: ",
      value: details.language,
    },
    {
      label: "State: ",
      value: details.status ? "Rent Available" : "Rent Unavailable",
    },
    {
      label: "ISBN: ",
      value: details.ISBN,
    },
    {
      label: "Read Amount: ",
      value: details.readAmount,
    },
    {
      label: "Upload time: ",
      value: details.uploadTime,
    },
  ];

  const handleRentBookEvent = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      message.error("You should login first!");
      return;
    }

    params.handleReserveModal(true);
  };

  return (
    <>
      <div className="body">
        <div className="content">
          <div className="basic flex">
            <div className="left mt-4 pr-4">
              <p className="desc">{details.desc}</p>

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
                    <img src={details.thumbnail} alt={details.title} />
                  </div>
                </div>

                <div className="btn-group mt-4">
                  <BubblyBtn
                    text="Rent this book"
                    disabled={!details.status}
                    handleEvent={() => {
                      handleRentBookEvent();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Comment details={details} />
        </div>
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
