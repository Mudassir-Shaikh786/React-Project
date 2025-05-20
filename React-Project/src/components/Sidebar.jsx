import { Home, BarChart, Settings, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const links = [
  { name: "Dashboard", Icon: Home, to: "/" },
  { name: "Reports", Icon: BarChart, to: "/" },
  { name: "Settings", Icon: Settings, to: "/" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!isOpen) {
    return (
      <button className="fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-800 p-2 rounded shadow-md"
        onClick={() => setIsOpen(true)}> ☰ </button>
    );
  }

  function removeClick(){
    setIsOpen(false);
  }

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 h-screen relative">
      <button onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition" aria-label="Close Sidebar"> <X className="w-5 h-5" />
      </button>

      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      <nav className="space-y-4">
        {links.map(({ name, Icon, to }) => (
          <NavLink onClick={removeClick}
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${
                isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
              }`
            }>
            <Icon className="w-5 h-5" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
