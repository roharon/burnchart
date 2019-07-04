import React, {Component} from 'react';
import {connect} from "react-redux";

import Notify from './Notify';
import Icon from './Icon';

class Header extends Component {

  render() {
    const {root, account, navigate} = this.props;

    // Sign-in/out.
    let user;
    if (account.user && account.user.profile) {
      user = (
        <div className="right">
          <div onClick={this.props.signOut}>
            <Icon name="signout" /> Sign Out {account.user.profile.displayName}
          </div>
        </div>
      );
    } else {
      user = (
        <div className="right">
          <div className="button" onClick={this.props.signIn}>
            <Icon name="github"/> Sign In
          </div>
        </div>
      );
    }

    // Switch loading icon with app icon.
    const icon = root.loading ? 'spinner' : 'fire';

    return (
      <div>
        <Notify {...root.notification} />
        <div id="head">
          {user}

          <div className="link" onClick={() => navigate('/')} id="icon">
            <Icon name={icon} />
          </div>

          <ul>
            <li>
              <div className="link" onClick={() => navigate('/new/repo')}>
                <Icon name="plus" /> Add a Repo
              </div>
            </li>
            <li>
              <div className="link" onClick={this.props.demo}>
                <Icon name="computer" /> See Examples
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {root} = state;

  return {
    root
  };
};

const mapDispatch = dispatch => ({
  signIn: dispatch.account.signIn,
  signOut: dispatch.account.signOut,
  demo: dispatch.root.demo,
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(Header);