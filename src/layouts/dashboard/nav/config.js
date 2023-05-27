// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'User',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  
  // {
  //   title: 'Game Mod',
  //   path: '/dashboard/gamemod',
  //   icon: icon('ic_game'),
  // },
  
  {
    title: 'Event Card',
    path: '/dashboard/eventcardlist',
    icon: icon('ic_blog'),
  },

  {
    title: 'Job',
    path: '/dashboard/jobcardlist',
    icon: icon('ic_jobcard'),
  },

  {
    title: 'Dream',
    path: '/dashboard/dreamlist',
    icon: icon('ic_dream'),
  },

  {
    title: 'Game Account',
    path: '/dashboard/gameaccountlist',
    icon: icon('ic_accounting'),
  },

  {
    title: 'Asset',
    path: '/dashboard/assetList',
    icon: icon('ic_accounting'),
  },


];

export default navConfig;
