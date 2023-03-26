import { Image } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function ModelInfo() {
  return (
    <>
      <div className="model-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Model</h2>
        <div className="model-container rounded p-2 flex justify-between items-center">
          <div className="left flex">
            <Image
              width={150}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div className="right">
            <div className="m-8 info-value edit-text cursor-pointer">
              <span className="text-base mr-2">Change Model</span>
              <EditOutlined />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
