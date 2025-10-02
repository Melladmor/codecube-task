export type DrawerT = {
  children: React.ReactNode;
  toggleDrawer: () => void;
  isOpen: boolean;
  title: string;
};
