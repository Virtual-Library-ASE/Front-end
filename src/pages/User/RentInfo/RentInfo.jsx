import { Image, message } from "antd";
import { CloseCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserSeatInfoApi } from "../../../api/api";
import { underscoreToCamelCaseKeysInArray } from "../../../resources/js/common";
import { useSelector } from "react-redux";
import EmptySVG from "../../../components/EmptySVG/EmptySVG";

const BookInfo = (params) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">Book Records</h2>

      <div className="book-records">
        {params.bookList.length ? (
          params.bookList.map((item, index) => (
            <div className="book rounded p-2 flex justify-between items-center">
              <div className="left flex">
                <Image
                  width={150}
                  preview={false}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div className="book-info ml-4 text-base py-4">
                  <div className="name text-xl font-bold">Jack</div>
                  <div className="author info-value mb-2">Jack</div>
                  <div className="rent-date">
                    Rent Date:{" "}
                    <span className="info-value">2022-12-12 13:14</span>
                  </div>
                  <div className="return-date">
                    Return Date:{" "}
                    <span className="info-value">2023-01-12 13:14</span>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="m-8 info-value edit-text cursor-pointer">
                  <span className="text-base mr-2">Return</span>
                  <RollbackOutlined />
                </div>
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
  return (
    <>
      <h2 className="text-xl font-bold mt-4 mb-2">Desk Records</h2>
      {params.deskList.length ? (
        params.deskList.map((item, index) => (
          <div className="desk rounded p-2 flex justify-between items-center">
            <div className="left flex">
              <Image
                width={150}
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div className="book-info ml-4 text-base py-4">
                <div className="name text-xl font-bold">Jack</div>
                <div className="author info-value mb-2">Jack</div>
                <div className="rent-date">
                  Rent Date:{" "}
                  <span className="info-value">2022-12-12 13:14</span>
                </div>
                <div className="return-date">
                  Return Date:{" "}
                  <span className="info-value">2023-01-12 13:14</span>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="m-8 info-value edit-text cursor-pointer">
                <span className="text-base mr-2">Cancel</span>
                <CloseCircleOutlined />
              </div>
            </div>
          </div>
        ))
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
  const [deskList, setDeskList] = useState([]);

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    getUserSeatInfoApi(userInfo.userId)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            let resData = underscoreToCamelCaseKeysInArray(res.data);
            setDeskList(resData);
          }
        } else {
          console.log("Error: res.msg");
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err.msg);
      });

    // getUserBookInfoApi(userInfo.userId)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200 && JSON.stringify(res.data) === "{}") {
    //       let resData = underscoreToCamelCaseKeys(res.data);
    //       setDeskList(resData);
    //     } else {
    //       console.log("Error: res.msg");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error: ", err);
    //   });
  }, []);

  return (
    <>
      <div className="rent-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Rent Records</h2>
        <div className="rent-content">
          <BookInfo bookList={bookList} />

          <DeskInfo deskList={deskList} />
        </div>
      </div>
    </>
  );
}
