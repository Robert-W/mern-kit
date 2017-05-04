import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react';

const Menu = (props) => {
  const iconButton = <IconButton><MoreIcon color='#FFF' /></IconButton>;
  const { links = {}} = props;

  return (
    <IconMenu
      iconButtonElement={iconButton}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      {links.logout ? <MenuItem primaryText='Logout' title='Logout' href='/auth/signout' /> : null}
    </IconMenu>
  );
};

export default class Header extends Component {
  render () {
    const {links} = this.props;

    return (
      <AppBar
        title='Mern-Kit'
        className='app__header'
        showMenuIconButton={false}
        iconElementRight={!links ? null : <Menu {...this.props} />} />
    );
  }
}
