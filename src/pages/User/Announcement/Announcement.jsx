import { Alert } from "antd";

export default function Announcement(params) {
  console.log(params);
  const announcementText =
    "You currently do not have any book or desk borrowing records";
  return (
    <>
      <div className="announcement mt-4">
        <Alert
          message="Announcement"
          description={announcementText}
          type="info"
          showIcon
          closable
        />
      </div>
    </>
  );
}
