import React from "react";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const CONTEXT_MENU_ID = "CONTEXT_MENU_ID";

interface ContextMenuProps {
  items: Array<string>;
  onContextMenuClickEvent: (itemName: string) => () => void;
}

const ContextMenu = ({ items, onContextMenuClickEvent }: ContextMenuProps) => {
  return (
    <Menu id={CONTEXT_MENU_ID}>
      {items.map((item) => (
        <Item key={item} onClick={onContextMenuClickEvent(item)}>
          {item}
        </Item>
      ))}
    </Menu>
  );
};

export default ContextMenu;
