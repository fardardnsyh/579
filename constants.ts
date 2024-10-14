export const NAVIGATION_LINKS = [
  {
    title: 'profile',
    href: '/profile',
  },
  {
    title: 'messages',
    href: '/profile/messages',
  },
  {
    title: 'settings',
    href: '/profile/settings',
  },
];

export const USERNAME_REGEX = /^[a-z0-9]{3,15}$/i;

export const EMAIL_REGEX =
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,16}$/;

export const messagesFetchLimit = 12;
