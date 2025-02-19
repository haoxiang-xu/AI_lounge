import React, { useState, useEffect, useContext, createContext } from "react";
import { ConfigContexts } from "../../CONTAINERs/config/contexts";
import { DataContexts } from "../../CONTAINERs/data/contexts";
import { StatusContexts } from "../../CONTAINERs/status/contexts";
import Icon from "../../BUILTIN_COMPONENTs/icon/icon";

const component_name = "side_menu";

const Contexts = createContext();

/* { Chat Room Section } ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
const ThemeSwitch = ({}) => {
  const { theme, setTheme, switchs } = useContext(ConfigContexts);
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        top: "50%",
        left: 32,

        width: 38,
        height: 24,

        borderRadius: 32,
        border: switchs.border,
        backgroundColor: switchs.backgroundColor,
        boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.16)",
      }}
      onClick={() => {
        setTheme((prev) =>
          prev === "light_theme" ? "dark_theme" : "light_theme"
        );
      }}
    >
      <Icon
        src="sun"
        style={{
          transition: "all 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "absolute",
          transform: "translate(0%, -50%)",
          top: theme === "light_theme" ? "50%" : "200%",
          left: -24,
          width: 18,
          height: 18,
          userSelect: "none",
          opacity: 0.5,
        }}
      />
      <Icon
        src="moon"
        style={{
          transition: "all 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "absolute",
          transform: "translate(0%, -50%)",
          top: theme === "light_theme" ? "200%" : "50%",
          left: -24,
          width: 18,
          height: 18,
          userSelect: "none",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          transition: "all 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "absolute",
          transform: "translate(0%, -50%)",
          top: "50%",
          left: theme === "light_theme" ? 3 : 16,

          width: 19,
          height: 19,

          borderRadius: 32,
          backgroundColor: switchs.toggle.backgroundColor,
        }}
      ></div>
    </div>
  );
};
const BottomPanel = ({ width }) => {
  return (
    <div
      style={{
        transition: "width 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
        position: "absolute",
        bottom: 0,
        left: 0,

        width: width,
        height: 40,
        overflow: "hidden",
      }}
    >
      <ThemeSwitch />
    </div>
  );
};
const OptionItem = ({ img_src, label, onClick }) => {
  const { sideMenu } = useContext(ConfigContexts);
  const [onHover, setOnHover] = useState(false);

  return (
    <>
      <div
        style={{
          transition: "border 0.16s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "relative",
          display: "block",
          width: "clac(100%- 6px)",
          height: 30,
          margin: 2,

          border: onHover
            ? `1px solid rgba(225, 225, 225, 0.16)`
            : `1px solid rgba(225, 225, 225, 0)`,
          borderRadius: 6,
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          setOnHover(true);
        }}
        onMouseLeave={(e) => {
          setOnHover(false);
        }}
      >
        <Icon
          src={img_src}
          style={{
            position: "absolute",
            transform: "translate(0, -50%)",
            top: "50%",
            left: 6,
            userSelect: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            transform: "translate(0, -50%)",
            top: "50%",
            left: 30,
            color: sideMenu.color,
            userSelect: "none",
          }}
        >
          {label}
        </span>
      </div>
    </>
  );
};
const Chat_Room_Item = ({ address }) => {
  const { RGB, colorOffset, sideMenu } = useContext(ConfigContexts);
  const {
    addressBook,
    sectionData,
    load_section_data,
    delete_address_in_local_storage,
  } = useContext(DataContexts);
  const { onSelectAddress, setOnSelectAddress } = useContext(Contexts);
  const [onHover, setOnHover] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: `rgba(${RGB.R + 30}, ${RGB.G + 30}, ${RGB.B + 30}, 0.64)`,
    boxShadow: "none",
    border: "1px solid rgba(255, 255, 255, 0)",
  });
  const [deleteButtonStyle, setDeleteButtonStyle] = useState({
    src: "delete",
    opacity: 0,
  });

  useEffect(() => {
    if (address === sectionData.address) {
      setContainerStyle({
        backgroundColor: sideMenu.chat_room_item.backgroundColor_onActive,
        boxShadow: sideMenu.chat_room_item.boxShadow_onActive,
        border: sideMenu.chat_room_item.border_onActive,
      });
      return;
    } else {
      setOnDelete(false);
    }
    if (onHover) {
      setContainerStyle({
        backgroundColor: sideMenu.chat_room_item.backgroundColor_onHover,
        boxShadow: "none",
        border: sideMenu.chat_room_item.border_onHover,
      });
    } else {
      setContainerStyle({
        backgroundColor: "rgba(0, 0, 0, 0)",
        boxShadow: "none",
        border: "1px solid rgba(255, 255, 255, 0)",
      });
    }
  }, [onHover, address, sectionData, sideMenu]);
  /* { update delete icon styling when on delete or not on delete } */
  useEffect(() => {
    if (onDelete) {
      setDeleteButtonStyle({
        src: "gray_delete",
        opacity: 0.5,
      });
    } else {
      setDeleteButtonStyle({
        src: "delete",
        opacity: 1,
      });
    }
  }, [onDelete]);

  return (
    <div
      style={{
        transition: "border 0.16s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
        position: "relative",
        width: "calc(100% - 24px)",
        height: 28,
        margin: "6px 12px 0 12px",

        borderRadius: 5,
        border: containerStyle.border,
        backgroundColor: containerStyle.backgroundColor,
        boxShadow: containerStyle.boxShadow,
      }}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        load_section_data(address);
        setOnDelete(false);
        setOnSelectAddress(null);
      }}
    >
      <span
        style={{
          transition: "all 0.2s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "absolute",
          display: "block",

          transform: "translateY(-50%)",
          top: "50%",
          left: 11,
          width: onDelete ? "calc(100% - 72px)" : "calc(100% - 36px)",

          fontSize: 14,

          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: sideMenu.color,

          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {addressBook[address]
          ? addressBook[address].chat_title || address
          : address}
      </span>
      <Icon
        src={"more"}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          right: 0,
          width: 17,
          height: 17,
          opacity: 0.32,

          userSelect: "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectAddress === address) {
            setOnSelectAddress(null);
          } else {
            setOnSelectAddress(address);
          }
        }}
      />

      <div
        style={{
          transition: "all 0.16s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "absolute",
          maxHeight: 128 * 0.618,
          top: 20,
          right: -1,
          width: onSelectAddress === address ? 128 : 32,
          zIndex: 1,

          backgroundColor: `rgba(${RGB.R + colorOffset.middle_ground}, ${
            RGB.G + colorOffset.middle_ground
          }, ${RGB.B + colorOffset.middle_ground}, 1)`,
          borderRadius: 8,
          border: `1px solid rgba(225, 225, 225, 0.16)`,
          boxSizing: "border-box",
          boxShadow: `0 0 8px rgba(0, 0, 0, 0.32)`,
          opacity: onSelectAddress === address ? 1 : 0,
          pointerEvents: onSelectAddress === address ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        <OptionItem
          img_src={"rename"}
          label={"Rename"}
          onClick={() => {
            console.log("rename");
          }}
        />
        <OptionItem
          img_src={"delete"}
          label={"Delete"}
          onClick={() => {
            delete_address_in_local_storage(address);
          }}
        />
      </div>
    </div>
  );
};
const Chat_Room_List = ({}) => {
  const { RGB, sideMenu } = useContext(ConfigContexts);
  const { start_new_section, addressBook } = useContext(DataContexts);
  const { componentOnFocus, setComponentOnFocus } = useContext(StatusContexts);

  const [chatRoomItems, setChatRoomItems] = useState([]);

  const [addButtonOnHover, setAddButtonOnHover] = useState(false);
  const [addButtonOnClick, setAddButtonOnClick] = useState(false);
  const [addButtonStyle, setAddButtonStyle] = useState({
    backgroundColor: `rgba(${RGB.R + 30}, ${RGB.G + 30}, ${RGB.B + 30}, 0)`,
    border: "1px solid rgba(255, 255, 255, 0)",
  });

  useEffect(() => {
    if (addButtonOnClick) {
      setAddButtonStyle({
        backgroundColor: `rgba(${RGB.R + 60}, ${RGB.G + 60}, ${
          RGB.B + 60
        }, 0.84)`,
        border: "1px solid rgba(255, 255, 255, 1)",
      });
    } else if (addButtonOnHover) {
      setAddButtonStyle({
        backgroundColor: `rgba(${RGB.R + 60}, ${RGB.G + 60}, ${
          RGB.B + 60
        }, 0.64)`,
        border: "1px solid rgba(255, 255, 255, 0.64)",
      });
    } else {
      setAddButtonStyle({
        backgroundColor: `rgba(${RGB.R + 30}, ${RGB.G + 30}, ${RGB.B + 30}, 0)`,
        border: "1px solid rgba(255, 255, 255, 0)",
      });
    }
  }, [addButtonOnHover, addButtonOnClick]);
  useEffect(() => {
    if (addressBook && Array.isArray(addressBook.avaliable_addresses)) {
      setChatRoomItems(
        addressBook.avaliable_addresses.map((address, index) => (
          <Chat_Room_Item key={index} address={address} />
        ))
      );
    }
  }, [addressBook]);
  return (
    <div
      className="scrolling-space"
      style={{
        position: "absolute",

        top: 72,
        left: 0,
        right: 0,
        bottom: 40,
        marginRight: 3,
        marginBottom: 3,

        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {chatRoomItems}
      <Icon
        className="add_chat_section_button"
        src="add"
        style={{
          transition: "border 0.16s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          userSelect: "none",
          position: "fixed",
          top: 46,
          right: 16,

          width: 16,
          height: 16,
          padding: 4,

          borderRadius: 4,
          backgroundColor: addButtonStyle.backgroundColor,
          border: addButtonStyle.border,

          opacity: 0.64,
        }}
        onMouseEnter={() => {
          setAddButtonOnHover(true);
        }}
        onMouseLeave={() => {
          setAddButtonOnHover(false);
          setAddButtonOnClick(false);
        }}
        onMouseDown={() => {
          setAddButtonOnClick(true);
        }}
        onMouseUp={() => {
          setAddButtonOnClick(false);
        }}
        onClick={() => {
          start_new_section();
          setComponentOnFocus("message_list");
        }}
      ></Icon>
      <span
        style={{
          transition: "left 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
          position: "fixed",
          top: 49,
          left: componentOnFocus === component_name ? 14 : -100,

          fontSize: 14,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: sideMenu.color,

          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        Chat Rooms
      </span>
    </div>
  );
};
/* { Chat Room Section } ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

const Side_Menu = ({}) => {
  const { RGB, border, sideMenu } = useContext(ConfigContexts);
  const {
    windowWidth,
    windowIsMaximized,
    componentOnFocus,
    setComponentOnFocus,
  } = useContext(StatusContexts);
  const [iconStyle, setIconStyle] = useState({});
  const [menuStyle, setMenuStyle] = useState({
    width: 0,
    borderRight: "0px solid rgba(255, 255, 255, 0)",
  });
  const [onSelectAddress, setOnSelectAddress] = useState(null);

  useEffect(() => {
    if (componentOnFocus === component_name) {
      if (window.innerWidth * 0.25 > 256) {
        setMenuStyle({
          width: Math.min(window.innerWidth * 0.25, 320),
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        });
        setIconStyle({
          src: "arrow",
          top: window.osInfo.platform === "darwin" ? 17 : 14,
          left: Math.min(window.innerWidth * 0.25, 320) - 16,
          transform: "translate(-50%, -50%) rotate(180deg)",
        });
      } else {
        setMenuStyle({
          width: 256,
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        });
        setIconStyle({
          src: "arrow",
          top: window.osInfo.platform === "darwin" ? 17 : 14,
          left: 256 - 16,
          transform: "translate(-50%, -50%) rotate(180deg)",
        });
      }
    } else {
      setMenuStyle({
        width: 0,
        borderRight: "0px solid rgba(255, 255, 255, 0)",
      });
      if (window.osInfo.platform === "darwin") {
        setIconStyle({
          src: "side_menu",
          top: 24.3,
          left: windowIsMaximized ? 25 : 85,
          transform: "translate(-50%, -50%)",
        });
      } else {
        setIconStyle({
          src: "side_menu",
          top: 20,
          left: 18,
          transform: "translate(-50%, -50%)",
        });
      }
      setOnSelectAddress(null);
    }
  }, [windowWidth, componentOnFocus, windowIsMaximized]);

  return (
    <Contexts.Provider value={{ onSelectAddress, setOnSelectAddress }}>
      <div>
        <div
          className="scrolling-space"
          style={{
            transition: "width 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
            position: "fixed",

            top: 0,
            left: 0,
            bottom: 0,

            width: menuStyle.width,

            boxSizing: "border-box",
            borderRight: border,
            scrollBehavior: "smooth",

            backgroundColor: sideMenu.backgroundColor,
            backdropFilter: "blur(36px)",
            WebkitAppRegion: "no-drag",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOnSelectAddress(null);
          }}
        >
          <Chat_Room_List />
        </div>
        <div
          className="icon-container"
          style={{
            transition:
              "width 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16), left 0.32s cubic-bezier(0.72, -0.16, 0.2, 1.16)",
            position: "fixed",
            transform: iconStyle.transform,

            top: iconStyle.top,
            left: iconStyle.left,
          }}
        >
          <Icon
            src={iconStyle.src}
            style={{
              cursor: "pointer",
              userSelect: "none",
              height: 20,
              opacity: 0.5,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (componentOnFocus === component_name) {
                setComponentOnFocus("");
              } else {
                setComponentOnFocus(component_name);
              }
            }}
          />
        </div>
        <BottomPanel width={menuStyle.width} />
      </div>
    </Contexts.Provider>
  );
};

export default Side_Menu;
