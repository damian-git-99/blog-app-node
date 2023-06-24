export const LoginTypes = {
  loading: '[login] loading',
  success: '[login] success',
  error: '[login] error'
}

export const RegisterTypes = {
  loading: '[register] loading',
  success: '[register] success',
  error: '[register] error'
}

export const LogoutTypes = {
  logout: '[logout] logout'
}

export const CheckTokenTypes = {
  loading: '[checkToken] loading',
  success: '[checkToken] success',
  error: '[checkToken] error'
}

const initialState = {
  userInfo: undefined,
  register: {
    loading: false,
    error: undefined
  },
  login: {
    loading: false,
    error: undefined
  },
  logout: {
    loading: false,
    error: undefined
  },
  checkToken: {
    loading: false,
    error: undefined
  }
}

export const userReducer = (state, action) => {
  switch (action.type) {
    // ** Register
    case RegisterTypes.loading:
      return {
        ...state,
        register: {
          loading: true,
          error: undefined
        }
      }
    case RegisterTypes.success:
      return {
        ...state,
        userInfo: action.payload,
        register: {
          loading: false,
          error: undefined
        }
      }
    case RegisterTypes.error:
      return {
        ...state,
        userInfo: undefined,
        register: {
          loading: false,
          error: action.payload
        }
      }
    // ** Login
    case LoginTypes.loading:
      return {
        ...state,
        login: {
          loading: true,
          error: undefined
        }
      }
    case LoginTypes.success:
      return {
        ...state,
        userInfo: action.payload,
        login: {
          loading: false,
          error: undefined
        }
      }
    case LoginTypes.error:
      return {
        ...state,
        userInfo: undefined,
        login: {
          loading: false,
          error: action.payload
        }
      }
    // ** Logout
    case LogoutTypes.logout:
      return {
        ...initialState
      }
    // ** checkToken -> UserProfile
    case CheckTokenTypes.loading:
      return {
        ...state,
        checkToken: {
          loading: true,
          error: undefined
        }
      }
    case CheckTokenTypes.success:
      return {
        ...state,
        userInfo: action.payload,
        checkToken: {
          loading: false,
          error: undefined
        }
      }
    case CheckTokenTypes.error:
      return {
        ...state,
        userInfo: undefined,
        checkToken: {
          loading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// export const userReducer = (state, action) => {
//   switch (action.type) {
//     case UserTypes.loading:
//       return {
//         ...state,
//         loading: true,
//         error: undefined,
//         userInfo: undefined
//       }
//     case UserTypes.success:
//       return {
//         ...state,
//         loading: false,
//         error: undefined,
//         userInfo: action.payload
//       }
//     case UserTypes.error:
//       return {
//         ...state,
//         error: action.payload,
//         userInfo: undefined,
//         loading: false
//       }
//     case UserTypes.logout:
//       return {
//         loading: false,
//         error: null,
//         userInfo: null
//       }
//     default:
//       return state
//   }
// }
