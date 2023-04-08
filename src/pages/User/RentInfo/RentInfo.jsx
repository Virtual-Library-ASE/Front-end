import { Image, message, Popconfirm } from "antd";
import { CloseCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getUserSeatInfoApi,
  getUserBookReservationApi,
  updateSeatReserApi,
  updateRentBookApi,
} from "../../../api/api";
import {
  timestampToDate,
  underscoreToCamelCaseKeys,
  underscoreToCamelCaseKeysInArray,
} from "../../../resources/js/common";
import { useSelector } from "react-redux";
import EmptySVG from "../../../components/EmptySVG/EmptySVG";

const BookInfo = (params) => {
  const cancelBook = (item) => {
    let req = {
      reservation_id: item.reservationId,
      is_delete: true,
    };

    updateRentBookApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully cancel!");
          params.handleUpdateBookInfo();
        } else {
          console.log("Error: ", res.msg);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err.msg);
      });
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Book Records</h2>

      <div className="book-records">
        {params.bookList.length ? (
          params.bookList.map((item, index) => (
            <div
              className="book rounded my-2 p-2 flex justify-between items-center"
              key={index}
            >
              <div className="left flex">
                <Image width={150} preview={false} src={item.thumbnail} />
                <div className="book-info ml-4 text-base py-4 flex items-center">
                  <div className="info-content">
                    <div className="name text-xl font-bold">
                      {item.bookName}
                    </div>
                    <div className="author info-value mb-2">{item.author}</div>
                    <div className="rent-date">
                      Rent Date:{" "}
                      <span className="info-value">
                        {timestampToDate(item.startTime)}
                      </span>
                    </div>
                    <div className="return-date">
                      Return Date:{" "}
                      <span className="info-value">
                        {timestampToDate(item.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Popconfirm
                  title="Cancel the book"
                  description="Are you sure to cancel this book?"
                  onConfirm={() => cancelBook(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className="m-8 info-value edit-text cursor-pointer">
                    <span className="text-base mr-2">Return</span>
                    <RollbackOutlined />
                  </div>
                </Popconfirm>
              </div>
            </div>
          ))
        ) : (
          <div>
            <EmptySVG text={"No Book Records"} />
          </div>
        )}
      </div>
    </>
  );
};

const DeskInfo = (params) => {
  let deskInfo = params.deskInfo;

  const cancelDesk = () => {
    let req = {
      reservation_id: deskInfo.reservationId,
      is_delete: true,
    };

    updateSeatReserApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully cancel!");
          params.setDeskInfo({});
        } else {
          console.log("Error: ", res.msg);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err.msg);
      });
  };

  return (
    <>
      <h2 className="text-xl font-bold mt-4 mb-2">Desk Records</h2>
      {JSON.stringify(deskInfo) !== "{}" ? (
        <div className="desk rounded p-2 flex justify-between items-center">
          <div className="left flex">
            <div className="img-container flex items-center">
              <Image width={150} preview={false} src={deskInfo.thumbnail} />
            </div>
            <div className="book-info ml-4 text-base py-4">
              <div className="room-name text-xl font-bold">
                {deskInfo.roomName}
              </div>
              <div className="start-date">
                Start Date:{" "}
                <span className="info-value">
                  {timestampToDate(deskInfo.startTime)}
                </span>
              </div>
              <div className="end-date">
                End Date:{" "}
                <span className="info-value">
                  {timestampToDate(deskInfo.endTime)}
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            <Popconfirm
              title="Cancel the seat"
              description="Are you sure to cancel this seat?"
              onConfirm={cancelDesk}
              okText="Yes"
              cancelText="No"
            >
              <div className="m-8 info-value edit-text cursor-pointer">
                <span className="text-base mr-2">Cancel</span>
                <CloseCircleOutlined />
              </div>
            </Popconfirm>
          </div>
        </div>
      ) : (
        <div>
          <EmptySVG text={"No Seat Records"} />
        </div>
      )}
    </>
  );
};

export default function RentInfo() {
  const [bookList, setBookList] = useState([]);
  const [deskInfo, setDeskInfo] = useState({});

  const [isUpdateBookInfo, setUpdateBookInfo] = useState(false);

  const handleUpdateBookInfo = () => {
    setUpdateBookInfo(!isUpdateBookInfo);
  };

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo.userId) {
      getUserSeatInfoApi(userInfo.userId)
        .then((res) => {
          if (res.status === 200) {
            if (JSON.stringify(res.data) !== "{}") {
              setDeskInfo(underscoreToCamelCaseKeys(res.data));
            }
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
          message.error(err.msg);
        });

      getUserBookReservationApi(userInfo.userId)
        .then((res) => {
          if (res.status === 200 && res.data.length) {
            let resData = underscoreToCamelCaseKeysInArray(res.data);
            setBookList(resData);
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [userInfo, isUpdateBookInfo]);

  return (
    <>
      <div className="rent-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Rent Records</h2>
        <div className="rent-content">
          <BookInfo
            bookList={bookList}
            setBookList={setBookList}
            handleUpdateBookInfo={handleUpdateBookInfo}
          />

          <DeskInfo deskInfo={deskInfo} setDeskInfo={setDeskInfo} />
        </div>
      </div>
    </>
  );
}
