import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import MainLayouts from "../layouts/MainLayouts";
import Signup from "../components/auth/Signup";
import Home from "../pages/Home";
import AlltrainerPage from "../pages/trainerPage/AlltrainerPage";
import TrainerDetail from "../pages/trainerPage/TrainerDetail";
import TrainerBooking from "../pages/trainerPage/booking/TrainerBooking";
import Paymentpage from "../pages/trainerPage/booking/payment/PaymentPage";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Be_a_Trainer from "../pages/dashboard/be-a-trainer/Be_a_Trainer";
import Profile from "../pages/dashboard/profile/Profile";
import MyBooking from "../pages/dashboard/myboking/MyBooking";
import BeATrainerPage from "../pages/dashboard/be-a-trainer/BeATrainerPage";
import Classes from "../pages/classes/Classes";
import ForumPage from "../pages/forum/ForumPage";
import Add_a_New_class from "../pages/dashboard/addClass/Add_a_New_class";
import AddNewSlot from "../pages/dashboard/trainer/AddNewSlot";
import ActivityLog from "../pages/dashboard/member/ActivityLog";
import ProfilePage from "../pages/dashboard/member/ProfilePage";
import BookedTrainer from "../pages/dashboard/member/BookedTrainer";
import NotFound from "../pages/notFound/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import ForumPosts from "../pages/forum/ForumComponents/ForumPosts";
import ManageSlots from "../pages/dashboard/trainer/ManageSlots";
import DashBoardHome from "../layouts/DashBoardHome";
import ApplyedTrainer from "../pages/dashboard/applyed/ApplyedTrainer";
import NewsLetter from "../pages/newsletter/NewsLetter";
import AllNewsLetter from "../pages/dashboard/newsletterall/AllnewsLetter";
import TrainerDeletebyRole from "../pages/dashboard/deleteTrainer/TrainerDeletebyRole";
import Balance from "../pages/dashboard/balance/Balance";
import NewForum from "../pages/dashboard/newForum/NewForum";
import ForumDetail from "../pages/latest_post/ForumDetail";
import AllTrainers from "../pages/dashboard/allTrainers/AllTrainers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/about", element: <h3>about</h3> },
      { path: "/contact", element: <h3>Contact</h3> },
      {
        path: "/trainers",
        element: <AlltrainerPage />,
      },
      { path: "/trainers/:id", element: <TrainerDetail /> },
      {
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <TrainerBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Paymentpage />
          </PrivateRoute>
        ),
      },
      { path: "/classes", element: <Classes /> },
      { path: "/forum", element: <ForumPosts /> },
      { path: "/forum/:id", element: <ForumDetail /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashBoardHome /> },
      { path: "profile", element: <Profile /> },
      { path: "my-bookings", element: <MyBooking /> },
      {
        path: "be-a-trainer",
        element: (
          <PrivateRoute>
            <Be_a_Trainer />
          </PrivateRoute>
        ),
      },
      {
        path: "be-a-trainer/apply",
        element: (
          <PrivateRoute>
            <BeATrainerPage />
          </PrivateRoute>
        ),
      },
      { path: "add-a-new-class", element: <Add_a_New_class /> },
      { path: "allNewsSubscribers", element: <AllNewsLetter /> },
      { path: "deleateAtrainer", element: <TrainerDeletebyRole /> },
      { path: "add-new-slot", element: <AddNewSlot /> },
      { path: "manage-slot", element: <ManageSlots /> },
      { path: "activity-log", element: <ActivityLog /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "booked-trainer", element: <BookedTrainer /> },
      { path: "appliedTrainer", element: <ApplyedTrainer /> },
      { path: "new-forum", element: <NewForum /> },
      { path: "balance", element: <Balance /> },
      { path: "allTrainers", element: <AllTrainers /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
