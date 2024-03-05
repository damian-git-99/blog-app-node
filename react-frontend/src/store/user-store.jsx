import { create } from 'zustand'
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest
} from '@/api/authApi'

export const useUserStore = create((set) => ({
  state: {
    userInfo: undefined,
    register: {
      loading: false,
      error: undefined
    },
    login: {
      loading: false,
      error: undefined
    },
    checkToken: {
      loading: false,
      error: undefined
    }
  },
  login: async (email = '', password = '') => {
    set({ state: { login: { loading: true } } })
    loginRequest({ email, password })
      .then((data) => {
        set({ state: { login: { loading: false }, userInfo: data } })
      })
      .catch((error) => {
        set({ state: { login: { loading: false, error: error.message } } })
      })
  },
  register: async (user) => {
    set({ state: { register: { loading: true } } })
    registerRequest(user)
      .then((data) => {
        set({ state: { register: { loading: false }, userInfo: data } })
      })
      .catch((error) => {
        set({ state: { register: { loading: false, error: error.message } } })
      })
  },
  loginWithData: (userData) => {
    set((s) => {
      return { state: { ...s, userInfo: userData } }
    })
  },
  logout: async () => {
    await logoutRequest()
    set({
      state: {
        userInfo: undefined,
        register: {
          loading: false,
          error: undefined
        },
        login: {
          loading: false,
          error: undefined
        },
        checkToken: {
          loading: false,
          error: undefined
        }
      }
    })
  },
  checkToken: () => {
    verifyTokenRequest()
      .then((data) => {
        set({ state: { userInfo: data } })
      })
      .catch((e) => {
        set({
          state: {
            userInfo: undefined,
            register: {
              loading: false,
              error: undefined
            },
            login: {
              loading: false,
              error: undefined
            },
            checkToken: {
              loading: false,
              error: undefined
            }
          }
        })
      })
  }
}))
