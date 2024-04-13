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