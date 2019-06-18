import React from "react";
import { Button, SideNav, SideNavItem } from "react-materialize";

//When a user is NOT signed in, they will see these links in the nav bar
const SignedOutSideNav = () => {
  return (
    <SideNav
      trigger={
        <Button flat>
          <i className="material-icons">menu</i>
        </Button>
      }
      options={{ closeOnClick: true }}
    >
      {/* <SideNavItem userView user={{
                background: 'https://placeimg.com/640/480/tech',
                image: 'static/media/react-materialize-logo.824c6ea3.svg',
                name: 'John Doe',
                …
            }} /> */}
      <SideNavItem href="/signin" icon="arrow_forward">
        Login
      </SideNavItem>

      <SideNavItem
        href="/signup"
        icon="account_box
"
      >
        Sign Up
      </SideNavItem>

      <SideNavItem divider />

      <SideNavItem waves href="/demo">
        Demo
      </SideNavItem>
    </SideNav>
  );
};

export default SignedOutSideNav;
