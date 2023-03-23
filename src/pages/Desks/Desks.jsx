import "./Desks.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect } from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="model-style absolute top-1/2 left-1/2 rounded p-4">
          <h2 className="text-xl mb-4">Reserve a Desk</h2>
          <div className="date">
            Date:
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Helper text example"
                slotProps={{
                  textField: {
                    helperText: "MM / DD / YYYY",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Modal>
    </div>
  );
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
