import "./Desks.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect } from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import * as React from "react";

const MOCK_ROOM_LIST = _.times(5, () => ({
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  capacity: faker.finance.amount(20, 30, 0),
  thumbnail: faker.image.city(200, 200, true),
  readAmount: faker.finance.amount(0, 30, 0),
}));

const RoomList = () => {
  const roomList = MOCK_ROOM_LIST;
  return (
    <>
      <div className="room-list container">
        <h2 className="text-xl font-bold mb-2">Rooms</h2>
        {roomList.map((item, index) => (
          <div
            className="room-card h-32 w-full rounded my-4 p-2 flex justify-between items-center"
            key={index}
          >
            <div className="left overflow-hidden w-28">
              <img src={item.thumbnail} alt={item.name} />
            </div>
            <div className="middle">
              <div className="name text-base font-bold">{item.name}</div>
              <div className="desc text-sm">
                There are currently {item.capacity} seats in the room, and there
                are still {item.readAmount} seats left
              </div>
            </div>
            <div className="right mx-2">
              <button className="reserve-btn rounded-3xl px-2 py-1 cursor-pointer">
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReserveModal = () => {
  return <div></div>;
};

const Desks = () => {
  // Show Carousel
  const dispatch = useDispatch();

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="Rooms">
        <RoomList></RoomList>
        <ReserveModal></ReserveModal>
      </div>
    </>
  );
};
export default Desks;
