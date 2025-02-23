import Routes from '~libs/routes';

const menuItems = [
  {
    key: 'home',
    label: 'Home',
    href: Routes.home,
  },
  {
    key: 'strategies',
    label: 'Strategies',
    href: Routes.strategies,
  },
  {
    key: 'reports',
    label: 'Reports',
    href: Routes.reports,
  },
  {
    key: 'plan',
    label: 'Plans',
    href: Routes.plans,
  },
  {
    key: 'about',
    label: 'About Us',
    href: Routes.about,
  },
  {
    key: 'faq',
    label: 'FAQs',
    href: Routes.faq,
  },
  {
    key: 'blog',
    label: 'Blog',
    href: Routes.blog,
  },
  {
    key: 'news',
    label: 'News',
    href: Routes.news,
  },
];

const walletMenuItems = [
  {
    key: 'wallets',
    label: 'Wallets',
    href: Routes.wallets,
  },
  {
    key: 'deposit',
    label: 'Deposit',
    href: Routes.deposit,
  },
  {
    key: 'withdraw',
    label: 'Withdraw',
    href: Routes.withdraw,
  },
  {
    key: 'transfer',
    label: 'Transfer',
    href: Routes.transfer,
  },
  // {
  //   key: 'swap',
  //   label: 'Swap',
  //   href: Routes.swap,
  // },
  // {
  //   key: 'pay',
  //   label: 'Pay',
  //   href: Routes.pay,
  // },
  // {
  //   key: 'verify',
  //   label: 'Verify',
  //   href: Routes.verify,
  // },
];

export {
  menuItems,
  walletMenuItems,
};
