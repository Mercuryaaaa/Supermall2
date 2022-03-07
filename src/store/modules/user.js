import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, constantRoutes, anyRoutes, resetRouter } from '@/router'
import router from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    // 用户名
    name: '',
    // 用户头像
    avatar: '',
    // 菜单信息
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限信息
    buttons: [],
    // 展示的异步路由
    resultAsyncRoutes: [],
    // 展示的所有路由
    resultRoutes: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限标记 
    state.routes = userInfo.routes;
    // 按钮权限标记
    state.buttons = userInfo.buttons;
    // 角色
    state.roles = userInfo.roles;
  },
  // 显示的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
    // 展示的所有路由
    state.resultRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    // 添加新路由
    router.addRoutes(state.resultRoutes)
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ username: username.trim(), password: password })
    // console.log(res)
    if (res.code === 20000) {
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return 'OK'
    } else {
      return Promise.reject(new Error('login file!'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

const computedAsyncRoutes = (asyncRoutes, routes) => {
  // console.log(asyncRoutes);
  // console.log(routes);
  // 过滤异步路由
  return asyncRoutes.filter(item => {
    // 没有这个元素返回-1
    if (routes.indexOf(item.name) != -1) {
      // 递归
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true;
    }
  })

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

