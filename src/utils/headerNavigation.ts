export const getHeaderNavigation = (currentPage: string) => [
  {
    label: "Home",
    href: "/",
    icon: "store",
    isCurrent: currentPage === "home",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: "phone",
    isCurrent: currentPage === "contact",
  },
  {
    label: "About",
    href: "/about",
    icon: "info",
    isCurrent: currentPage === "about",
  },
];
