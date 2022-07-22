/*
 * @Author: your name
 * @Date: 2021-05-13 17:31:30
 * @LastEditTime: 2021-05-15 10:22:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dayu_space/src/store/index.js
 */
import { createApp } from "vue";
import App from "../App.vue";
import Vuex from 'vuex'

createApp(App).use(Vuex)

export default new Vuex.Store({
  state: {
    cancelTokenArr: [],
    freshen: false,
    platform: '',
    courseOpenId: '',
    isLogin: false, // 是否登录成功
    loginPage: false, // 是否打开登录组件
    token: localStorage.getItem('token') || '', //登录的用户密钥
    isLoading: false,
    userType: [],
    studyType: 0,
    schoolId: '',
    Alphabet: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    urlPreview: '',
    courseCover: '',
    postHead: {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    userIfon: {},
    setUserTypeShow: false,
    myOperation: [],
    tearingCustomShow: false,
  
  },
  mutations: {
    PUSH_CANCEL(state, payload){
      state.cancelTokenArr.push(payload.cancelToken);
    },
    CLAER_CANCEL(state){
        // cancelTokenArr.forEach(item => {
        //   item('路由跳转取消请求');
        // });
        state.cancelTokenArr = [];
    },
    SET_FRESHEN(state){
      state.freshen = !state.freshen
    },
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_platform(state, payload){
      state.platform = payload
    },
    SET_LOGINPAGE(state, payload) {
      state.loginPage = payload
    },
    SET_AUTHORIZATION(state, Authorization) {
      state.Authorization = Authorization
    },
    SET_USERTYPE(state, userType) {
      state.userType = userType
    },
    SET_SCHOOLID(state, schoolId) {
      state.schoolId = schoolId
    },
    SET_COURSECOVER(state, payload) {
      state.courseCover = payload
    },
    SET_STUDYTYPE(state, studyType) {
      state.studyType = studyType
    },
    SET_MYOPERATION(state, myOperation) {
      state.myOperation = myOperation
    },
    SET_TEARINGCUSTOMSHOW(state, tearingCustomShow) {
      //自定义教师端 现隐
      state.tearingCustomShow = tearingCustomShow
    },
    SET_CUSTOMTEADATA(state, customTeaData) {
      //自定义教师端 首页数据
      state.customTeaData = customTeaData
    },
    SET_RIGHTDATA(state,arr){
      state.customTeaData.rightDataData = arr
    },
    SET_RIGHTTOP(state,show){
      state.customTeaData.rightTopData = show
    },
    SET_URLPREVIEWSHOW(state, payload) {
      // 展示资源预览模态框
      state.urlPreviewShow = payload.urlPreviewShow // 资源预览是否为true
      state.urlPreview = payload.url // 资源获取地址
      state.media = payload.media // 媒体数据
      state.category = payload.category // 媒体类型
    },
    SET_USERIFON(state,show){
      state.userIfon = show
    },
    SET_SETUSERTYPESHOW(state,show){
      state.setUserTypeShow = show
    },
  },
  actions: {},
  modules: {},
})
