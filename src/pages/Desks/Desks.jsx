import "./Desks.css";
import { useDispatch, useSelector } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect, useState } from "react";
import * as React from "react";
import { message } from "antd";
import ReserveModal from "./SeatReserveModal/SeatReserveModal";
import { getAllReadingRoomApi } from "../../api/api";
import { underscoreToCamelCaseKeysInArray } from "../../resources/js/common";

let readingRoomList = [];
let updateRoomList = false;

const toggleUpdateRoomList = () => {
  updateRoomList = !updateRoomList;
};

const RoomList = (props) => {
  const [roomList, setRoomList] = useState([]);
  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    getAllReadingRoomApi()
      .then((res) => {
        if (res.status === 200) {
          let roomData = underscoreToCamelCaseKeysInArray(res.data);
          setRoomList(roomData);
          readingRoomList = roomData;
        } else {
          console.log("Error: ", res.msg);
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err);
      });
  }, [updateRoomList]);

  let reserveRoom = (item) => {
    if (!isLogin) {
      message.error("Please Login first!");
      return;
    }
    props.handleReserveModal(true);
    props.setCurrRoomInfo(item);
  };

  return (
    <>
      <div className="room-list container">
        <h2 className="text-xl font-bold mb-2">Reading Rooms</h2>
        {roomList.map((item, index) => (
          <div
            className="room-card h-32 w-full rounded my-4 p-2 flex justify-between items-center"
            key={index}
          >
            <div className="left overflow-hidden w-28">
              <img src={item.thumbnail} alt={item.roomName} />
            </div>
            <div className="middle">
              <div className="name text-base font-bold">{item.roomName}</div>
              <div className="desc text-sm">
                There are currently {item.roomCapacity} seats in the room, and
                there are still {item.restAmount} seats left
              </div>
            </div>
            <div className="right mx-2">
              <button
                className="reserve-btn rounded-3xl px-2 py-1 cursor-pointer"
                onClick={() => reserveRoom(item)}
              >
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Desks = () => {
  // Show BasicCarousel
  const dispatch = useDispatch();
  const [isReserve, setReserveModal] = useState(false);
  const [currRoomInfo, setCurrRoomInfo] = useState({});

  const handleReserveModal = (bool) => {
    setReserveModal(bool);
  };

  useEffect(() => {
    // Show BasicCarousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="Rooms">
        <RoomList
          handleReserveModal={handleReserveModal}
          setCurrRoomInfo={setCurrRoomInfo}
        ></RoomList>
        <ReserveModal
          isShow={isReserve}
          currRoomInfo={currRoomInfo}
          toggleUpdateRoomList={toggleUpdateRoomList}
          readingRoomList={readingRoomList}
          handleReserveModal={handleReserveModal}
        ></ReserveModal>
      </div>
    </>
  );
};
export default Desks;
