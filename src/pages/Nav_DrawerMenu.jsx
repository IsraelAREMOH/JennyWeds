import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import RsvpModal from "../Components/rsvpModal";

const Nav_DrawerMenu = ({ isOpen, onClose, navItems }) => {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const location = useLocation();

  // 🧠 Extract uniqueId from URL (e.g. ?rsvp=I&A/2025/Table-01/israel-001)
  useEffect(() => {
    const rawQuery = location.search.substring(1);
    const match = rawQuery.match(/id=(.*)/);

    if (match && match[1]) {
      const decodedId = decodeURIComponent(match[1]);
      console.log("🧩 URL Unique ID:", decodedId);

      setUniqueId(decodedId);

      // 🧠 Force modal to stay open for testing
      setTimeout(() => setIsRsvpOpen(true), 300);
    }
  }, [location]);

  const handleOpenRsvp = () => setIsRsvpOpen(true);
  const handleCloseRsvp = () => setIsRsvpOpen(false);

  return (
    <>
      {/* Drawer + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 bg-black z-[60]"
            />

            {/* Drawer Panel */}
            <Motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-black/95 text-white z-[70] shadow-2xl flex flex-col"
            >
              {/* Header / Close */}
              <div className="flex justify-end p-6 border-b border-white/10">
                <button
                  onClick={onClose}
                  aria-label="Close Menu"
                  className="hover:text-pink-400 transition"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Nav Links */}
              <ul className="flex-1 bg-[#9CAF88] p-8 space-y-6 text-lg tracking-wide">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block hover:text-pink-400 transition ${
                          isActive ? "text-pink-400 font-semibold" : ""
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Footer Section */}
              <div className="p-2 border-t border-white/10 space-y-4">
                <button
                  onClick={handleOpenRsvp}
                  className="w-full py-2 rounded-md bg-gradient-to-r from-[#A52A2A] to-[#FFB6C1] text-white font-semibold shadow hover:opacity-90 transition"
                >
                  RSVP
                </button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={handleCloseRsvp}
        uniqueId={uniqueId}
      />
    </>
  );
};

export default Nav_DrawerMenu;
