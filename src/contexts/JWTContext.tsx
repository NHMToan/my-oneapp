import {
  useLoginMutation,
  useLogoutMutation,
  useMeLazyQuery,
  useRegisterMutation,
} from "generated/graphql";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { IUser } from "types/user";
// utils
import { getRefreshToken, isValidToken, setSession } from "../utils/jwt2";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  REFRESH_TOKEN: (state, action) => {
    const { isAuthenticated } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
    };
  },
  REFRESH_USER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface IAuthContext {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser;
  method: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}
const AuthContext = createContext<IAuthContext>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  refreshUser: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [onLogin] = useLoginMutation();
  const [getUser] = useMeLazyQuery({ fetchPolicy: "no-cache" });
  const [onRegister] = useRegisterMutation();
  const [logoutServer] = useLogoutMutation();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const res = await getUser();

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: res.data.me,
            },
          });
        } else {
          const success = await getRefreshToken();
          if (success) {
            const res = await getUser();
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: res.data.me,
              },
            });
          } else {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await onLogin({
        variables: { loginInput: { email, password } },
      });
      if (response?.data?.login.success) {
        const {
          login: { accessToken, user },
        } = response.data;

        setSession(accessToken);

        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
      } else {
        if (response?.data?.login.message) throw response.data.login.message;
      }
    } catch (e) {
      throw e || "Server error!";
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await onRegister({
      variables: { registerInput: { email, password, firstName, lastName } },
    });

    if (response.data?.register.success) {
      const {
        register: { accessToken, user },
      } = response.data;

      setSession(accessToken);

      dispatch({
        type: "REGISTER",
        payload: {
          user,
        },
      });
    } else {
      if (response.data?.register.message) throw response.data.register.message;
    }
  };

  const refreshUser = async () => {
    const res = await getUser();

    dispatch({
      type: "REFRESH_USER",
      payload: {
        user: res.data.me,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    await logoutServer({
      variables: { userId: state?.user?.id },
    });
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
