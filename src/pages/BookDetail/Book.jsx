import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { underscoreToCamelCaseKeys } from "../../resources/js/common";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { getBookByIdApi } from "../../api/api";

import { LeftOutlined } from "@ant-design/icons";
import ReserveModal from "./ReservationModal/ReserveModal";
import Comment from "./Comment/Comment";
import "./Book.css";
import { Button, message } from "antd";
import LikeBtn from "../../components/LikeBtn/LikeBtn";

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
  console.log(details);

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

  const setBookStateClass = (label) => {
    if (label === "State: ") {
      if (details.status) {
        return "book-available font-bold";
      } else {
        return "book-unavailable font-bold";
      }
    }
    return "";
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
                    <span className={setBookStateClass(info.label)}>
                      {info.value}
                    </span>
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

                <div className="btn-group mt-4 flex items-center">
                  <Button
                    className="mr-4"
                    style={{
                      padding: "9px 16px",
                      fontSize: "18px",
                      height: "auto",
                    }}
                    type="primary"
                    disabled={!details.status}
                    onClick={() => {
                      handleRentBookEvent();
                    }}
                  >
                    Rent the book
                  </Button>

                  <LikeBtn details={details} />
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
  }, [routerParams.id]);

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(false));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  const [isReserve, setReserveModal] = useState(false);
  const handleReserveModal = (bool) => {
    setReserveModal(bool);
  };

  const updateBookState = (bool) => {
    setBookDetail({
      ...bookDetail,
      status: bool,
    });
  };

  return (
    <>
      <div className="book" style={{ marginTop: "-30px" }}>
        <BookHeader details={bookDetail} />
        <BookBody
          details={bookDetail}
          handleReserveModal={handleReserveModal}
        />

        <ReserveModal
          isShow={isReserve}
          bookDetail={bookDetail}
          updateBookState={updateBookState}
          handleReserveModal={handleReserveModal}
        ></ReserveModal>
      </div>
    </>
  );
};
export default Book;
