import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';



export default function DrawerBar({ role, drawerWidth, handleDrawerClose, open , theme}: any) {
    

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));
    const Listitemlink = () => {
        var menu: any[] = [];

        if (role === "admin") {
            menu = [
                { "text": "A", "icon": <InboxIcon />, "link": "/" },
                { "text": "B", "icon": <InboxIcon />, "link": "/dashboard" },
                { "text": "C", "icon": <InboxIcon />, "link": "/localdashboard" },
            ]
        } else if (role === "intendant") {
            menu = [
                //{ "text": "A", "icon": <InboxIcon />, "link": "/" } form 

            ]
        }
        else if (role === "pharmacist") {
            menu = [
                { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
            
                { name: "ข้อมูลผู้ป่วย", icon: <PersonIcon />, path: "/patient" },
                
                { name: "สั่งยา", icon: <LocalPharmacyIcon />, path: "/prescription" },
                {
                  name: "ประวัติการสั่งยา",
                  icon: <LibraryBooksIcon />,
                  path: "/PrescriptionHistory",
                },
              ];
        }
        else if (role === "payment") {
            menu = [
                //{ "text": "A", "icon": <InboxIcon />, "link": "/" } form 

            ]
        }

        
        const navigator = useNavigate();
        return (
            menu.map((data, index) => (
                <ListItem key={data.name} disablePadding>
                    <ListItemButton onClick={()=>{navigator(data.path)}}>
                        <ListItemIcon>
                            {data.icon}
                        </ListItemIcon>
                        <ListItemText primary={data.name} />
                    </ListItemButton>
                </ListItem>
            ))
        )
    }
    return (
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
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {
                    Listitemlink()
                }
            </List>
        </Drawer>
    )
}
