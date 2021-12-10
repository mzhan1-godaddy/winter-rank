import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import {Fab, ListItemButton} from "@mui/material";
import './rankingDrawer.scss';
import {useLocationContext} from "../context/locationContext";
import {useEffect} from "react";
import {Webcams} from "./windy/webcams";

const drawerWidth = 500;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export function LocationViewDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {locations, currentLocation, hottestLocation, setCurrentLocation} = useLocationContext();

    useEffect(() => {
        console.log({currentLocation}, 'mz current location change from drawer!');
        if (currentLocation)
            setOpen(true);
    }, [currentLocation?.name])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex', 'flex-flow': 'row-reverse'}}>
            <div className="fab-container">
                <Fab size={'small'} className="fab" aria-label="menu" onClick={handleDrawerOpen}>
                    <MenuIcon/>
                </Fab>
            </div>
            <CssBaseline/>
            {/*<AppBar position="fixed" open={open}>*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton*/}
            {/*            color="inherit"*/}
            {/*            aria-label="open drawer"*/}
            {/*            onClick={handleDrawerOpen}*/}
            {/*            edge="start"*/}
            {/*            sx={{ mr: 2, ...(open && { display: 'none' }) }}*/}
            {/*        >*/}
            {/*            <MenuIcon />*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6" noWrap component="div">*/}
            {/*            Persistent drawer*/}
            {/*        </Typography>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}


            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >

                <DrawerHeader>
                    <IconButton edge={'start'} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <div className='rank-container'>
                    <h1>{currentLocation?.name}</h1>


                    <Divider/>
                    <Webcams/>
                </div>
            </Drawer>
            {/*<Main open={open}>*/}
            {/*<DrawerHeader />*/}

            {/*</Main>*/}
        </Box>
    );
}
