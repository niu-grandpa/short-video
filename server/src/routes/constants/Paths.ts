/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';

const Paths = {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    One: '/one',
    Update: '/update',
    Login: '/login',
    Logout: '/logout',
    Profile: '/profile',
  },
  Videos: {
    Base: '/videos',
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
