import { Link } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        <Link to="/" className="hover:text-orange-400 transition-colors duration-300">
          Pokedex
        </Link>
      </h1>
      <div className="w-full">
        <CustomRoutes />
      </div>
    </div>
  );
}

export default App;
