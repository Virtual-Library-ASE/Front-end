import { Image } from "antd";
import { CloseCircleOutlined, RollbackOutlined } from "@ant-design/icons";

export default function RentInfo() {
  return (
    <>
      <div className="rent-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Rent Records</h2>

        <div className="rent-content">
          <h2 className="text-xl font-bold mb-2">Book Records</h2>
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

          <h2 className="text-xl font-bold mt-4 mb-2">Desk Records</h2>
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
        </div>
      </div>
    </>
  );
}
