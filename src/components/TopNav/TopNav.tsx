import { Anchor, Menu, createStyles } from '@mantine/core';
import {
  AiOutlineCarryOut,
  AiOutlineCluster,
  AiOutlineDashboard,
  AiOutlineFileSync,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link, useMatches, useNavigate } from 'react-location';

import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';
import { useAuth } from '@/hooks/useAuth';
import { AppRoutePaths } from '@/router/routes';

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
    { link: AppRoutePaths.JOBS, label: 'Jobs', icon: <AiOutlineCarryOut /> },
    { link: AppRoutePaths.CLUSTERS, label: 'Clusters', icon: <AiOutlineCluster /> },
    { link: AppRoutePaths.FILES, label: 'Files', icon: <AiOutlineFileSync /> },
    { link: AppRoutePaths.SUMMARY, label: 'Summary', icon: <AiOutlineDashboard /> },
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
      <img src={mantisImage} alt="Mantis Logo" className="h-8 w-12 mx-8" />
      <div className="flex flex-row gap-12 items-center h-full">{items}</div>

      <div className="ml-auto flex flex-row gap-10 mr-6 h-full">
        <Menu trigger="hover" shadow="md">
          <Menu.Target>
            <div className="flex flex-row items-center gap-2">
              <AiOutlineQuestionCircle /> Help
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              className={classes.menuItem}
              icon={<AiOutlineInfoCircle />}
              component="a"
              href="http://go/mantis"
              target="_blank"
            >
              Docs
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu trigger="hover" shadow="md">
          <Menu.Target>
            <div className="flex flex-row items-center gap-2">
              <AiOutlineUser /> {user?.name}
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              className={classes.menuItem}
              icon={<AiOutlineLogout />}
              onClick={() => logout(() => navigate({ to: AppRoutePaths.LOGIN }))}
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
