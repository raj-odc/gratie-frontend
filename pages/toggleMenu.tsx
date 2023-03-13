import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";

export default function ToggleButtonNotEmpty() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open:boolean) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div>
        <b>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, color:'#00FF01' }} onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        </b>
            <Drawer
              anchor="right"
              onClose={toggleDrawer(false)}
            open={open}
            >
                <Box sx={{
                  p: 2,
                  height: 1,
                  backgroundColor: "#000",
                  borderLeft: 'solid 1px #fff',
                }}>

                  <Box className="toggle-box">
                    <ListItemButton className="toggle-item">
                      <Link href='#core'>
                      Core Values
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href='#working'>
                      How We Work
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                        <Link href="#useCase">
                        Use Case
                        </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#price">
                      Pricing
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#timeLine">
                        Time Line
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#community">
                      Community
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#team">
                      Team
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#white">
                      White Paper
                      </Link>
                    </ListItemButton>
                    <ListItemButton className="toggle-item">
                      <Link href="#blog">
                      Blog
                      </Link>
                    </ListItemButton>
                  </Box>
                </Box>
            </Drawer>
    </div>

  );
}