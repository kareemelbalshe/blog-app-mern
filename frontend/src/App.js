import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/home/Home.jsx'
import Login from './pages/forms/Login.jsx'
import Register from './pages/forms/Register.jsx'
import PostsPage from './pages/postsPage/PostsPage.jsx'
import CreatePosts from './pages/createPost/CreatePost.jsx'
import AdminDashbord from './pages/admin/AdminDashboard.jsx'
import Footer from "./components/footer/Footer";
import PostDeatails from "./pages/postDetails/PostDeatails";
import { ToastContainer } from 'react-toastify'
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostTable from "./pages/admin/PostTable";
import CategoryTable from "./pages/admin/CategoryTable";
import CommentTable from "./pages/admin/CommentTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";


function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path="create-post" element={user ? <CreatePosts /> : <Navigate to="/" />} />
          <Route path="details/:id" element={<PostDeatails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>
        <Route path="admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashbord /> : <Navigate to="/" />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostTable /> : <Navigate to="/" />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoryTable /> : <Navigate to="/" />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentTable /> : <Navigate to="/" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
