import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Collapse, Container, Stack } from "@mui/material";
import menu from "../data/menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Split from "react-split";
import EventLogger from "../components/shared/EventLogger";
import BasicMapPreview from "../components/maps/basic-map/BasicMapPreview";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    // padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  py: 0,
  boxShadow: "none", // Equivalent to elevation: 0
}));

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  minHeight: "48px",
  height: "48px",
  justifyContent: "flex-end",
}));

export default function MainLayout({ multiColumn = false }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /*
  ..######..########....###....########.########
  .##....##....##......##.##......##....##......
  .##..........##.....##...##.....##....##......
  ..######.....##....##.....##....##....######..
  .......##....##....#########....##....##......
  .##....##....##....##.....##....##....##......
  ..######.....##....##.....##....##....########
  */
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState("");

  /*
  .##.....##.########.########.##.....##..#######..########...######.
  .###...###.##..........##....##.....##.##.....##.##.....##.##....##
  .####.####.##..........##....##.....##.##.....##.##.....##.##......
  .##.###.##.######......##....#########.##.....##.##.....##..######.
  .##.....##.##..........##....##.....##.##.....##.##.....##.......##
  .##.....##.##..........##....##.....##.##.....##.##.....##.##....##
  .##.....##.########....##....##.....##..#######..########...######.
  */
  const handleNavigationMenuOpen = () => {
    setOpen(true);
  };
  const handleNavigationMenuClose = () => {
    setOpen(false);
  };
  const toggleItem = (itemName) => {
    if (openItems === itemName) {
      setOpenItems("");
      return;
    }
    setOpenItems(itemName);
  };

  /*
  .########.########.########.########..######..########..######.
  .##.......##.......##.......##.......##....##....##....##....##
  .##.......##.......##.......##.......##..........##....##......
  .######...######...######...######...##..........##.....######.
  .##.......##.......##.......##.......##..........##..........##
  .##.......##.......##.......##.......##....##....##....##....##
  .########.##.......##.......########..######.....##.....######.
  */
  useEffect(() => {
    const parentRoutePaths = menu?.reduce((acc, item) => {
      if (item?.children?.length > 0) {
        acc.push(item?.route);
      }
      return acc;
    }, []);

    for (let path in parentRoutePaths) {
      if (pathname.includes(parentRoutePaths[path])) {
        setOpenItems(parentRoutePaths[path]);
        return;
      }
    }
  }, [pathname]);

  return (
    <Stack direction={"row"} width={"100%"} sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Container>
          <Toolbar
            sx={{
              py: 0.5,
              minHeight: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              gap={2}
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleNavigationMenuOpen}
                edge="start"
                sx={[
                  {
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                  open && { display: "none" },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Box component={"img"} src="/logo.png" width={25} />
                <Typography variant="body1" noWrap fontSize={22}>
                  Frontendkit
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleNavigationMenuOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                ]}
              >
                <MenuIcon />
              </IconButton> */}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "white",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            py: 2.7,
            minHeight: "auto !important",
          }}
        >
          <IconButton sx={{ mr: 2 }} onClick={handleNavigationMenuClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
                      ? `${theme.palette.primary.main}30`
                      : "transparent",
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}50`,
                  },
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}30`,
                  },
                  "&:hover.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}50`,
                  },
                }}
                selected={pathname?.includes(`/${menuItem.route}`)}
                onClick={() => {
                  if (menuItem?.children?.length > 0) {
                    toggleItem(menuItem.route);
                  } else {
                    navigate(`/${menuItem.route}`);
                    handleNavigationMenuClose();
                  }
                }}
              >
                {menuItem.name}
                {menuItem?.children?.length > 0 && (
                  <ListItemIcon>
                    <ArrowDropDownIcon
                      sx={{
                        transform:
                          menuItem?.route === openItems
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  </ListItemIcon>
                )}
              </ListItemButton>

              <Collapse
                in={menuItem.route === openItems}
                timeout="auto"
                unmountOnExit
              >
                {menuItem?.children?.length > 0 && (
                  <List sx={{ pl: 2 }}>
                    {menuItem.children.map((child) => (
                      <ListItemButton
                        selected={pathname?.includes(
                          `/${menuItem.route}/${child.route}`
                        )}
                        disableRipple
                        disableTouchRipple
                        key={child.name}
                        onClick={() => {
                          navigate(`/${menuItem.route}/${child.route}`);
                          handleNavigationMenuClose();
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
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {multiColumn && (
          <Split className="split" gutterSize={7} minSize={300}>
            <div
              style={{
                minWidth: "50vw",
              }}
            >
              <Stack flexGrow={1} height={"100%"}>
                <BasicMapPreview />
              </Stack>
            </div>
            <div
              style={{
                height: "100%",
              }}
            >
              <Stack px={1} flexGrow={1} height={"100%"}>
                <EventLogger />
              </Stack>
            </div>
          </Split>
        )}
        {!multiColumn && <Outlet />}
      </Main>
    </Stack>
  );
}
