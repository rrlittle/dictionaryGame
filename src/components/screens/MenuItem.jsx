import React from "react";
import { Menu } from "semantic-ui-react";
import "./style/MenuItem.css";

const MenuItem = ({ icon, content }) => (
    <Menu.Item
        icon={icon}
        content={<div className="hideOnMobile">{content}</div>}
    />
);
export default MenuItem;
