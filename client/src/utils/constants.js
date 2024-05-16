import paths from "./path";

export const navigations = [
  {
    id: 1,
    path: '/',
    text: 'HOME'
  },
  {
    id: 2,
    path: `/${paths.ABOUT_US}`,
    text: 'ABOUT US'
  },
  {
    id: 3,
    path: `/${paths.OUR_AGENTS}`,
    text: 'OUR AGENTS'
  },
  {
    id: 4,
    path: `/${paths.PROPERTIES}`,
    text: 'PROPERTIES'
  },
  {
    id: 5,
    path: `/${paths.SEARCH}`,
    text: 'SEARCH'
  }
]

export const SIGN_IN = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER'
}

export const adminSidebar = [
  {
    id: 12,
    name: 'Dashboard',
    path: `/${paths.ADMIN_LAYOUT}/${paths.DASHBOARD}`,
    icon: 'RiDashboardLine',
    type: 'SINGLE'
  },
  {
    id: 13,
    name: 'Property Type',
    icon: 'MdOutlineAddHomeWork',
    type: 'PARENT',
    subs: [
      {
        id: 131,
        path: `/${paths.ADMIN_LAYOUT}/${paths.CREATE_PROPERTY_TYPE}`,
        name: 'Create new'
      },
      {
        id: 132,
        path: `/${paths.ADMIN_LAYOUT}/${paths.MANAGE_PROPERTY_TYPE}`,
        name: 'Manage'
      }
    ]
  }
];