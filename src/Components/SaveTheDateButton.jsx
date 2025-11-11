import { motion as Motion } from "framer-motion";

const SaveTheDateButton = ({
  title = "Jennifer & Aisosa's Wedding Celebration",
  location = "Benin, Nigeria",
  startDate = "2025-11-29T12:00:00+01:00",
  endDate = "2025-11-29T21:00:00+01:00",
  bgColor = "bg-[#9CAF88]",
  hoverColor = "hover:bg-[#AFCF9E]",
  textColor = "text-[#F8F5DC]",
  label = "Save the Date",
}) => {
  // Generate Google Calendar link
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate.replace(/[-:]/g, "").slice(0, 15)}Z/${endDate
    .replace(/[-:]/g, "")
    .slice(0, 15)}Z&location=${encodeURIComponent(
    location
  )}&details=${encodeURIComponent("Join us for our wedding celebration!")}`;

  // Generate .ics file for iPhone/Outlook
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${startDate.replace(/[-:]/g, "").slice(0, 15)}Z
DTEND:${endDate.replace(/[-:]/g, "").slice(0, 15)}Z
LOCATION:${location}
DESCRIPTION:Join us for our wedding celebration!
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SaveTheDate.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Main handler Google first, fallback to ICS
  const handleSaveDate = () => {
    const isGoogle = /Android|Gmail|Chrome/i.test(navigator.userAgent);
    if (isGoogle) {
      window.open(googleCalendarUrl, "_blank");
    } else {
      handleDownloadICS();
    }
  };

  return (
    <Motion.button
      className={`mt-4 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg transition text-sm sm:text-base ${bgColor} ${hoverColor} ${textColor}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleSaveDate}
    >
      {label}
    </Motion.button>
  );
};

export default SaveTheDateButton;
