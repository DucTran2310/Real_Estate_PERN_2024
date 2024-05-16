import { MdOutlineAddHomeWork } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

export const renderIcon = (icon) => {
  switch (icon) {
    case 'RiDashboardLine':
      return <RiDashboardLine />;
    case 'MdOutlineAddHomeWork':
      return <MdOutlineAddHomeWork />;
    // ... and so on for other icons
    default:
      return null;
  }
};