export const getHeaderNavigation = (currentPage: string) => [
  {
    label: "Home",
    href: "/",
    icon: "store",
    isCurrent: currentPage === "home",
  },
  {
    label: "About",
    href: "/about",
    icon: "info",
    isCurrent: currentPage === "about",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: "phone",
    isCurrent: currentPage === "contact",
  },
];
