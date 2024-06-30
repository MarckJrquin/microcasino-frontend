import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ToogleTheme from './ToggleTheme';
import { toggleTheme } from '../redux/slices/theme';
import { signout } from "../redux/slices/auth";

import ProfileService from "../services/profile.service";

import { Toaster, toast } from 'sonner';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faChevronDown, faDiceOne, faDiceTwo, faDiceThree, faDiceFour } from "@fortawesome/free-solid-svg-icons";


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme.theme);

  const menuItemsNav = [
    { name: "Inicio", path: "/home" },
    { name: "Juegos", path: "/games" },
    { name: "Promociones", path: "/promotions" },
    { name: "Exchange", path: "/exchange" },
    { name: "Ayuda", path: "/help" },
  ];

  const menuItems = [
    { name: "Inicio", path: "/home" },
    { name: "Juegos", path: "/games" },
    { name: "Promociones", path: "/promotions" },
    { name: "Exchange", path: "/exchange" },
    { name: "Perfil", path: "/profile" },
    { name: "Activity", path: "/activity" },
    { name: "Configuración", path: "/settings" },
    { name: "Ayuda", path: "/help" },
    { name: "Cerrar Sesión", path: "/logout" }
  ];

  const icons = {
    logo: <FontAwesomeIcon icon={faCoins} />,
    faChevronDown: <FontAwesomeIcon icon={faChevronDown} />,
    faDiceOne: <FontAwesomeIcon icon={faDiceOne} className="text-warning" fill="currentColor" size={"lg"} />,
    faDiceTwo: <FontAwesomeIcon icon={faDiceTwo} className="text-success" fill="currentColor" size={"lg"} />,
    faDiceThree: <FontAwesomeIcon icon={faDiceThree} className="text-secondary" fill="currentColor" size={"lg"} />,
    faDiceFour: <FontAwesomeIcon icon={faDiceFour} className="text-primary" fill="currentColor" size={"lg"} />,
  };

  const gameItems = [
    { name: "Ruleta", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", icon: icons.faDiceOne },
    { name: "BlackJack", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", icon: icons.faDiceTwo },
    { name: "Tragamoneda", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", icon: icons.faDiceThree },
    { name: "Baccarat", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", icon: icons.faDiceFour },
  ];


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await ProfileService.getProfileData();
        setProfileData(data);
      } catch (error) {
        toast.error(error.message || 'Error desconocido');
      }
    };

    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);


  const handleLogout = async (e) => { 
    e.preventDefault();

    const resultAction = await dispatch(signout());

    if (signout.fulfilled.match(resultAction)) {
        toast.success('Sesión Cerrada');
        navigate('/');
        window.location.reload();
    } 
  };


  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href="/home">
          <FontAwesomeIcon icon={faCoins} className="font-bold text-black dark:text-white"/>
          <p className="font-bold text-black dark:text-white pl-2">CASINO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItemsNav.map((item) => (
          item.name === "Juegos" ? (
            <NavbarItem key={item.name} isActive={location.pathname === item.path}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                    endContent={icons.faChevronDown}
                    radius="sm"
                    variant="light"
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Game options"
                  className="w-[345px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {gameItems.map((game) => (
                    <DropdownItem
                      key={game.name}
                      description={game.description}
                      startContent={game.icon}
                    >
                      {game.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <NavbarItem key={item.name} isActive={location.pathname === item.path}>
              <Link color="foreground" href={item.path}>
                {item.name}
              </Link>
            </NavbarItem>
          )
        ))}
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                endContent={icons.faChevronDown}
                radius="sm"
                variant="light"
              >
                Juegos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[345px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="Ruleta"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              startContent={icons.faDiceOne}
            >
              Ruleta
            </DropdownItem>
            <DropdownItem
              key="BlackJack"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              startContent={icons.faDiceTwo}
            >
              BlackJack
            </DropdownItem>
            <DropdownItem
              key="Tragamoneda"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              startContent={icons.faDiceThree}
            >
              Tragamoneda
            </DropdownItem>
            <DropdownItem
              key="Baccarat"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              startContent={icons.faDiceFour}
            >
              Baccarat
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarItem>
      </NavbarContent> */}
          
      { !isLoggedIn 
      ? 
        <NavbarContent justify="end">   
          <ToogleTheme 
            theme={theme} 
            switchTheme={() => dispatch(toggleTheme())}
          />
          <NavbarItem className="hidden lg:flex" >
            <Button as={Link} color="primary" href="/login" variant="ghost">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      : 
        <NavbarContent as="div" justify="end">
          <ToogleTheme 
            theme={theme} 
            switchTheme={() => dispatch(toggleTheme())}
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                name={profileData?.name + " " + profileData?.lastName}
                src={profileData?.avatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesión iniciada como</p>
                <p className="font-semibold">{profileData?.email}</p>
              </DropdownItem>
              <DropdownItem key="myprofile" as={Link} href="/profile" className="text-black dark:text-white">Mi Perfil</DropdownItem>
              <DropdownItem key="editprofile">Editar Perfil</DropdownItem>
              <DropdownItem key="help">Ayuda</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      }
      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`} isActive={location.pathname === item.path}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              isActive={location.pathname === item.path}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
 export default Nav;