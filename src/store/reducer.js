/* jshint esversion: 6 */
// store初始化仓库数据
const initState = {
  isLogin: false,
  menuList: [],

  isShowCarousel: true,
  isShowFooter: true,
};
// reducer纯函数，用于操作中央仓库的数据
export const reducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case "SET_LOGIN":
      // 在不改变原有的state基础上，返回一个新的state
      return {
        ...state,
        isLogin: data,
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
