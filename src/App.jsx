import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";

export default function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center ">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </div>
  );
}
