import "./App.css";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import NotFound from "./routes/NotFound.jsx";
import MainLayout from "./routes/MainLayout.jsx";
import MissionSlide from "./routes/MissionSlide.jsx";
import VisionSlide from "./routes/VisionSlide.jsx";
import ServiceSlide from "./routes/ServiceSlide.jsx";
import FounderSlide from "./routes/Founder.jsx";
import Events from "./routes/Events.jsx";
import Contact from "./routes/Contact.jsx";
import Episodes from "./routes/Episodes.jsx";
import Store from "./routes/Store.jsx";
import Admin from "./routes/Admin.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />}>
        <Route index element={<MissionSlide />} />
        <Route path="mission" element={<MissionSlide />} />
        <Route path="vision" element={<VisionSlide />} />
        <Route path="ministry" element={<ServiceSlide />} />
        <Route path="founder" element={<FounderSlide />} />
        <Route path="events" element={<Events />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="episodes" element={<Episodes />} />
      <Route path="store" element={<Store />} />
      <Route path="admin" element={<Admin />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
