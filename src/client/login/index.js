import Login from 'login/js/components/Login';
import {render} from 'react-dom';
import React from 'react';

import 'login/css/login.scss';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(<Login />, document.getElementById('mount'));
