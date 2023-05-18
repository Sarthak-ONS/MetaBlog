import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./containers/Header/Header";
import Trending from "./containers/Trending/Trending";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Trending />
    </div>
  );
}

export default App;
