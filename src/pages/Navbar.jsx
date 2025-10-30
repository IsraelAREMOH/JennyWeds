import { useState, useEffect } from "react";
import { navItems } from "../constants/index";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Nav_DrawerMenu from "./Nav_DrawerMenu";
import RsvpModal from "../Components/rsvpModal";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("rsvp"); // get the value after ?rsvp=
    if (idFromUrl) {
      setIsRsvpOpen(true); // open modal automatically
      setUniqueId(idFromUrl); // set it dynamically
    }
  }, [location]);
  const handleOpenRsvp = () => setIsRsvpOpen(true);
  const handleCloseRsvp = () => setIsRsvpOpen(false);

  const [uniqueId, setUniqueId] = useState(null); // in production, dynamically get from invite link
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#A52A2A] font-semibold border-b-2 border-[#FFB6C1] pb-1"
      : "hover:text-[#FFB6C1]";

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left: Logo & Event Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline text-center sm:text-left flex-shrink-0">
            <h4
              className="text-5xl sm:text-4xl md:text-4xl"
              style={{ fontFamily: "'Allura', cursive" }}
            >
              J & A
            </h4>
            <p className="sm:ml-3 mt-1 sm:mt-0 text-xs sm:text-sm md:text-lg lg:text-2xl">
              29. 11. 25 | Benin, Nigeria
            </p>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex ml-10 items-center space-x-8 xl:space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink className={getNavLinkClass} to={item.href}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={handleOpenRsvp}
              className="py-2 px-4 rounded-md bg-gradient-to-r from-[#6F4E37] to-[#FFB6C1] text-white shadow hover:opacity-90 transition"
            >
              RSVP
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center ml-2">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Toggle Mobile Menu"
              className="p-2 text-gray-700 hover:text-pink-500 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* DrawerMenu Component */}
        <Nav_DrawerMenu
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          navItems={navItems}
        />

        <RsvpModal
          isOpen={isRsvpOpen}
          onClose={handleCloseRsvp}
          uniqueId={uniqueId}
        />
      </div>
    </nav>
  );
};

export default Navbar;
