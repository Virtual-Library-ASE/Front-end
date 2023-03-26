import { EditOutlined } from "@ant-design/icons";

const getBasicInfoArr = (infoData) => {
  return [
    {
      label: "Name: ",
      value: infoData.name,
    },
    {
      label: "Password: ",
      value: infoData.password,
    },
    {
      label: "Email: ",
      value: infoData.email,
    },
    {
      label: "Phone Number: ",
      value: infoData.phone,
    },
    {
      label: "Gender: ",
      value: infoData.gender,
    },
    {
      label: "Birth Date: ",
      value: infoData.birthDate,
    },
    {
      label: "Description: ",
      value: infoData.desc,
    },
  ];
};

export default function BasicInfo(param) {
  const basicInfoArr = getBasicInfoArr(param.infoData);

  return (
    <>
      <div className="basic-info mt-8">
        <h2 className="text-2xl font-bold mb-2 flex justify-between">
          <span>Basic Info</span>
          <EditOutlined className="info-value edit-icon cursor-pointer" />
        </h2>
        <ul className="text-base">
          {basicInfoArr.map((item, index) => (
            <li className="flex py-2 justify-between" key={index}>
              <span className="label w-1/6">{item.label}</span>
              <span className="info-value">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
