/* jshint esversion: 6 */
// store初始化仓库数据
const initState = {
  isLogin: false,
  userInfo: {
    userName: "ChenMo",
    avatar: "https://chenmo1212.cn/file/avatar/spring.png",
    password: "74567456",
    email: "chenmo1212@qq.com",
    phone: "+861234567891",
    gender: "male",
    birthDate: "2000-06-26",
    desc: "Try my best!",
  },
  menuList: [],

  isShowCarousel: true,
  isShowFooter: true,
};
// reducer pure function, used to operate the data in the central warehouse
export const reducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case "SET_LOGIN":
      // Return a new state without changing the original state
      return {
        ...state,
        isLogin: data,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: data,
      };
    case "SET_MENU_LIST":
      return {
        ...state,
        menuList: data,
      };
    case "SET_CAROUSEL_STATUS":
      return {
        ...state,
        isShowCarousel: data,
      };
    case "SET_FOOTER_STATUS":
      return {
        ...state,
        isShowFooter: data,
      };
    default:
      return initState;
  }
};
