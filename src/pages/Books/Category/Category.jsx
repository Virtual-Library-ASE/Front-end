import { useNavigate } from "react-router-dom";
import {
  BookOutlined,
  CoffeeOutlined,
  FileImageOutlined,
  HeartOutlined,
  ScissorOutlined,
} from "@ant-design/icons";

const categoryList = [
  {
    icon: <FileImageOutlined style={{ color: "#ba52fe" }} />,
    title: "Photography",
    bgColor: "#f3ebf8",
  },
  {
    icon: <CoffeeOutlined style={{ color: "#faa432" }} />,
    title: "Food & Drink",
    bgColor: "#f8f3ed",
  },
  {
    icon: <HeartOutlined style={{ color: "#f37970" }} />,
    title: "Romance",
    bgColor: "#f7f1f1",
  },
  {
    icon: <ScissorOutlined style={{ color: "#35d2f6" }} />,
    title: "Health",
    bgColor: "#edf5f8",
  },
  {
    icon: <BookOutlined style={{ color: "#fa5748" }} />,
    title: "Biography",
    bgColor: "#f8f0ee",
  },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="category-container flex justify-between">
        {categoryList.map((item, index) => (
          <div
            key={index}
            className="card rounded h-28 w-1/6 p-4"
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="icon">{item.icon}</div>
            <div className="title font-bold my-2 text-sm">{item.title}</div>
            <div
              className="link text-xs cursor-pointer"
              style={{ color: "#f65d4f" }}
              onClick={() => navigate("/books/" + item.title)}
            >
              Read More >
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
