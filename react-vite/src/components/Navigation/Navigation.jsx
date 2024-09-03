import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { FaCartShopping } from "react-icons/fa6";
import CartModal from "../Cart/ShoppingCart";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import * as cartActions from "../../redux/cart";

function Navigation() {
    const dispatch = useDispatch();
    const [showCartModal, setShowCartModal] = useState(false);

    const user = useSelector((state) => state.session.user);
    const cartsObj = useSelector((state) => state.cart);
    const carts = Object.values(cartsObj);

    const userCart = user
        ? carts?.find((cart) => cart.user_id === user.id)
        : null;
    const cartItemCount = userCart ? userCart.cart_items.length : 0;

    useEffect(() => {
        dispatch(cartActions.fetchAllCarts());
    }, [dispatch]);

    return (
        <ul className="navigation-bar">
            <li className="button">
                <NavLink to="/">
                    <img
                        id="home-icon"
                        src="../../../official_logo.png"
                        alt="Home"
                    />
                </NavLink>
            </li>
            <li className="login-logout-container">
                {user ? (
                    <div id="profile-container">
                        <NavLink to="/user/cart">
                            <FaCartShopping />
                            {cartItemCount > 0 && (
                                <span className="cart-item-count">
                                    {cartItemCount}
                                </span>
                            )}
                        </NavLink>

                        <ProfileButton />
                    </div>
                ) : (
                    <>
                        <NavLink to="/login" className="login-button">
                            Log In
                        </NavLink>
                        <NavLink to="/signup" className="logout-button">
                            Sign Up
                        </NavLink>
                    </>
                )}
            </li>
        </ul>
    );
}

export default Navigation;
