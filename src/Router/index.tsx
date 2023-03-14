import { PATH_AFTER_LOGIN } from "config";
import AuthGuard from "guards/AuthGuard";
import GuestGuard from "guards/GuestGuard";
import AdminLayout from "layouts/admin";
import DashboardLayout from "layouts/dashboard";
import LogoOnlyLayout from "layouts/LogoOnlyLayout";
import { lazy, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/")} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <Login /> },
        { path: "register-unprotected", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "new-password", element: <NewPassword /> },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "home", element: <Home /> },
        { path: "event", element: <Events /> },
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/dashboard/user/profile" replace />,
              index: true,
            },
            { path: ":id", element: <UserProfile /> },
            { path: "account", element: <UserAccount /> },
          ],
        },
        // { path: "people", element: <People /> },
        {
          path: "blog",
          children: [
            {
              element: <Navigate to="/dashboard/blog/posts" replace />,
              index: true,
            },
            { path: "posts", element: <BlogPosts /> },
            { path: "post/:id", element: <BlogPost /> },
            { path: "new", element: <BlogNewPost /> },
            { path: "post/:id/edit", element: <BlogNewPost /> },
          ],
        },
        {
          path: "club",
          children: [
            {
              element: <ClubsList />,
              index: true,
            },
            { path: ":id", element: <ClubPage /> },
            { path: "new", element: <ClubForm /> },
            { path: ":id/edit", element: <ClubForm /> },
          ],
        },
        {
          path: "rating",
          children: [
            {
              element: <Rating />,
              index: true,
            },
          ],
        },
        {
          path: "admin-rating",
          element: <AdminLayout />,
          children: [
            {
              element: <AdminRatingList />,
              index: true,
            },
            { path: ":id", element: <AdminRatingDetails /> },
            { path: "new", element: <AdminRatingForm /> },
            { path: ":id/edit", element: <AdminRatingForm /> },
          ],
        },
        {
          path: "notification",
          children: [
            {
              element: <Notification />,
              index: true,
            },
          ],
        },
        {
          path: "chat",
          children: [
            { element: <Chat />, index: true },
            { path: "new", element: <Chat /> },
            { path: ":conversationKey", element: <Chat /> },
          ],
        },
        // {
        //   path: "chatbot",
        //   children: [{ element: <ChatBot />, index: true }],
        // },
      ],
    },
    { path: "/", element: <Navigate to="/home" replace /> },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPassword = Loadable(lazy(() => import("../pages/auth/NewPassword")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const Events = Loadable(lazy(() => import("../pages/Dashboard")));
const Home = Loadable(lazy(() => import("../pages/Home")));
// USER
const UserAccount = Loadable(lazy(() => import("../pages/User/UserAccount")));
const UserProfile = Loadable(lazy(() => import("../pages/User/UserProfile")));

//People
// const People = Loadable(lazy(() => import("../pages/People")));
// BLOG
const BlogPosts = Loadable(lazy(() => import("../pages/Blogs/BlogsList")));
const BlogPost = Loadable(lazy(() => import("../pages/Blogs/BlogPost")));
const BlogNewPost = Loadable(lazy(() => import("../pages/Blogs/BlogForm")));
// BLOG
const ClubsList = Loadable(lazy(() => import("../pages/Clubs/ClubsList")));
const ClubForm = Loadable(lazy(() => import("../pages/Clubs/ClubFrom")));
const ClubPage = Loadable(lazy(() => import("../pages/Clubs/ClubPage")));

const Chat = Loadable(lazy(() => import("../pages/Chat")));
// const ChatBot = Loadable(lazy(() => import("../pages/ChatBot")));
const Notification = Loadable(lazy(() => import("../pages/Notification")));

//Rating
const Rating = Loadable(lazy(() => import("../pages/Rating")));

//Admin
const AdminRatingList = Loadable(
  lazy(() => import("../pages/Admin/Rating/RatingList"))
);
const AdminRatingDetails = Loadable(
  lazy(() => import("../pages/Admin/Rating/RatingDetails"))
);
const AdminRatingForm = Loadable(
  lazy(() => import("../pages/Admin/Rating/RatingForm"))
);
