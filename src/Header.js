import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { totalQuantity } from "./reducer";
import MenuIcon from "@mui/icons-material/Menu";

function Header(userAuth) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [showHeaderNav, setShowHeaderNav] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  useEffect(() => {
    if (basket.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [basket]);

  const handleHamburgerClick = () => {
    setShowHeaderNav(!showHeaderNav);
  };

  const handleClick = () => {
    if (showHeaderNav) {
      setShowHeaderNav(false);
    }
  };

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
    handleClick();
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header__searchIcon" />
      </div>

      <div
        className={
          showHeaderNav
            ? "header__nav header__nav__mobile hamburger__slide"
            : "header__nav"
        }
      >
        <Link to={(!user || userAuth) && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to={user && "/orders"}>
          <div
            onClick={(e) => {
              handleClick();
              if (!user) {
                alert("You need to Login First");
              }
            }}
            className="header__option"
          >
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option" onClick={handleClick}>
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div
            className={
              btnIsHighlighted
                ? "header__optionBasket bump"
                : "header__optionBasket"
            }
            onClick={handleClick}
          >
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {totalQuantity(basket)}
            </span>
          </div>
        </Link>
      </div>

      <div
        className={
          showHeaderNav ? "hamburger-menu hamburger__slide" : "hamburger-menu"
        }
      >
        <a href="#" onClick={handleHamburgerClick}>
          <MenuIcon className="hamburger__icon" />
        </a>
      </div>

      {showHeaderNav && (
        <div onClick={handleClick} className="hamburger__backdrop"></div>
      )}
    </div>
  );
}

export default Header;
