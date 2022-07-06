import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Iconify from "components/Iconify";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
interface MobileBottomNavigationProps {}
const MobileBottomNavigation: FC<MobileBottomNavigationProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          icon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => {
            navigate(-1);
          }}
        />
        <BottomNavigationAction
          icon={<Iconify icon="eva:refresh-fill" />}
          onClick={() => {
            navigate(0);
          }}
        />
        <BottomNavigationAction
          icon={<Iconify icon="eva:arrow-forward-fill" />}
          onClick={() => {
            navigate(1);
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNavigation;
