import Hero from "./Components/Hero";
import UserMangagement from "./Components/UserMangement";
import UserProvider from "./Context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="w-full min-h-screen p-5 text-slate-500 bg-slate-950">
        <Hero />
        <UserMangagement />
      </div>
    </UserProvider>
  );
}

export default App;
