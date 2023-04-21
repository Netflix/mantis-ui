import { Anchor, Menu, createStyles } from '@mantine/core';
import {
  MdHelpOutline,
  MdInfoOutline,
  MdLogout,
  MdOutlineEventAvailable,
  MdOutlineFilePresent,
  MdOutlineLan,
  MdOutlineSpaceDashboard,
  MdPersonOutline,
} from 'react-icons/md';
import { Link, useMatches, useNavigate } from 'react-router-dom';

import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';
import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useAuth } from '@/hooks/useAuth';

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  link: {
    display: 'flex',
    height: '100%',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? 'white' : theme.colors.blue[7],
      borderBottom: `2px solid ${theme.colorScheme === 'dark' ? 'white' : theme.colors.blue[7]}`,
    },
  },

  activeLink: {
    color: theme.colorScheme === 'dark' ? 'white' : theme.colors.blue[7],
    borderBottom: `2px solid ${theme.colorScheme === 'dark' ? 'white' : theme.colors.blue[7]}`,
  },

  menuItem: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      color: theme.colorScheme === 'dark' ? 'white' : theme.colors.blue[7],
    },
  },
}));

function TopNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const selectedKey = match.pathname.split('/')[1];

  const { classes } = useStyles();

  const links = [
    { link: AppRoutePaths.JOBS, label: 'Jobs', icon: <MdOutlineEventAvailable /> },
    { link: AppRoutePaths.CLUSTERS, label: 'Clusters', icon: <MdOutlineLan /> },
    { link: AppRoutePaths.FILES, label: 'Files', icon: <MdOutlineFilePresent /> },
    { link: AppRoutePaths.SUMMARY, label: 'Summary', icon: <MdOutlineSpaceDashboard /> },
  ];

  const items = links.map((link) => {
    return (
      <Anchor
        key={link.label}
        component={Link}
        to={link.link}
        className={`${classes.link} ${
          link.label.toLocaleLowerCase() === selectedKey ? classes.activeLink : ''
        }`}
      >
        <div className="flex flex-row items-center gap-2">
          {link.icon} {link.label}
        </div>
      </Anchor>
    );
  });

  return (
    <div className={classes.navbar}>
      <img src={mantisImage} alt="Mantis Logo" className="mx-8 h-8 w-12" />
      <div className="flex h-full flex-row items-center gap-12">{items}</div>

      <div className="ml-auto mr-6 flex h-full flex-row gap-10">
        <Menu trigger="hover" shadow="md">
          <Menu.Target>
            <div className="flex flex-row items-center gap-2">
              <MdHelpOutline /> Help
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              className={classes.menuItem}
              icon={<MdInfoOutline />}
              component="a"
              href="https://netflix.github.io/mantis/"
              target="_blank"
            >
              Docs
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" shadow="md">
          <Menu.Target>
            <div className="flex flex-row items-center gap-2">
              <MdPersonOutline /> {user?.name}
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              className={classes.menuItem}
              icon={<MdLogout />}
              onClick={() => logout(() => navigate(AppRoutePaths.LOGIN))}
            >
              Log Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}

export default TopNav;
