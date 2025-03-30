import {
  Button,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import menu from "../../data/menu";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [moduleMenuEl, setModuleMenuEl] = useState(null);
  const moduleMenuOpen = Boolean(moduleMenuEl);
  const handleModuleMenuClick = (event) => {
    setModuleMenuEl(event.currentTarget);
  };
  const handleModuleMenuClose = () => {
    setModuleMenuEl(null);
  };
  const [openItems, setOpenItems] = useState("");

  const toggleItem = (itemName) => {
    if (openItems === itemName) {
      setOpenItems("");
      return;
    }
    setOpenItems(itemName);
  };
  return (
    <Stack
      py={1}
      width={"100%"}
      bgcolor={theme.palette.primary.main}
      color={"white"}
    >
      <Container maxWidth="desktop">
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="body1" fontSize={24}>
            Frontendkit
          </Typography>
          <Button
            endIcon={<ArrowDropDownIcon />}
            variant="outlined"
            onClick={handleModuleMenuClick}
            sx={{
              borderRadius: 0,
              color: "white",
              borderColor: "white",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "white",
                color: theme.palette.primary.main,
              },
            }}
          >
            Modules
          </Button>
          <Menu
            anchorEl={moduleMenuEl}
            open={moduleMenuOpen}
            onClose={handleModuleMenuClose}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1,
                width: 300,
                backgroundColor: "white",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                "& .MuiMenuItem-root": {
                  py: 1,
                  minHeight: "auto",
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.dark}10`,
                  },
                },
              },
            }}
          >
            <List>
              {menu?.map((menuItem) => (
                <div key={menuItem.name}>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor:
                        menuItem?.name === openItems
                          ? `${theme.palette.primary.main}20`
                          : "transparent",
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}20`,
                      },
                    }}
                    onClick={() => toggleItem(menuItem.name)}
                  >
                    {menuItem.name}
                    <ListItemIcon>
                      <ArrowDropDownIcon
                        sx={{
                          transform:
                            menuItem?.name === openItems
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "all 0.2s ease-in-out",
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>

                  <Collapse
                    in={menuItem.name === openItems}
                    timeout="auto"
                    unmountOnExit
                  >
                    {menuItem?.children?.length > 0 && (
                      <List sx={{ pl: 2 }}>
                        {menuItem.children.map((child) => (
                          <ListItemButton
                            disableRipple
                            disableTouchRipple
                            key={child.name}
                            onClick={() => {
                              navigate(`/${menuItem.route}/${child.route}`);
                              handleModuleMenuClose();
                            }}
                          >
                            {child.name}
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </Collapse>
                </div>
              ))}
            </List>
          </Menu>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Header;
