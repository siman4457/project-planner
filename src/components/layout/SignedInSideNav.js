import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { Button, SideNav, SideNavItem } from "react-materialize";

//When a user is signed in, they will see these links in the nav bar
const SignedInSideNav = props => {
  const { uid } = props;
  return (
    <div>
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
        <SideNavItem href={"/dashboard/" + uid} icon="dashboard">
          Dashboard
        </SideNavItem>

        <SideNavItem href={"/create/" + uid} icon="edit">
          New Project
        </SideNavItem>

        <SideNavItem divider />

        <SideNavItem
          waves
          href="/signin"
          icon="arrow_back"
          onClick={props.signOut}
        >
          Sign Out
        </SideNavItem>
      </SideNav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInSideNav);
