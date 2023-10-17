import { useState } from "react";
import MenuItem from "./MenuItem";

export default function Menus({menus}) {
    const [menuState, setMenuState] = useState({});

    console.log(menuState);
    
    const toggleSubMenu = (itemId) => {
        console.log(itemId);
        setMenuState((prevState) => ({
        ...prevState,
        [itemId]: !prevState[itemId] || false,
        }));
    };
    
    return (
        <ul>
            {menus.map((menuItem) => (
                <MenuItem key={menuItem.id} item={menuItem} onToggle={toggleSubMenu} />
            ))}
        </ul>
    );
}
