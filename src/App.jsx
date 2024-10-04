import { Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/wrapper/Wrapper";
import Login from "./components/login/Login";
import Categories from "./pages/categories/Categories";
import Faqs from "./pages/faqs/Faqs";
import News from "./pages/news/News";
import Blogs from "./pages/blogs/Blogs";
import Services from "./pages/services/Services";
import Sources from "./pages/sources/Sources";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<Wrapper />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sources" element={<Sources />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
