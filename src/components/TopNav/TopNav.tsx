import { Menu } from 'antd';
import {
  CarryOutOutlined,
  ClusterOutlined,
  DashboardOutlined,
  FileSyncOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { Link, useMatches, useNavigate } from 'react-location';
import { AppRoutePaths } from '@/router/routes';

function TopNav() {
  const { SubMenu } = Menu;
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'logout': {
        logout(() => navigate({ to: AppRoutePaths.LOGIN }));
        break;
      }
      case 'docs': {
        const docsLink = 'http://go/mantis';
        window.open(docsLink, '_blank');
        break;
      }
      case 'slack': {
        const slackLink = 'https://netflix.slack.com/archives/C0B4SU16H';
        window.open(slackLink, '_blank');
        break;
      }
    }
  };

  return (
    <Menu mode="horizontal" selectedKeys={[match.pathname.split('/')[1]]} onClick={onClick}>
      <Menu.Item key="jobs" icon={<CarryOutOutlined />}>
        <Link to={AppRoutePaths.JOBS}>Jobs</Link>
      </Menu.Item>
      <Menu.Item key="clusters" icon={<ClusterOutlined />}>
        <Link to={AppRoutePaths.CLUSTERS}>Clusters</Link>
      </Menu.Item>
      <Menu.Item key="files" icon={<FileSyncOutlined />}>
        <Link to={AppRoutePaths.FILES}>Files</Link>
      </Menu.Item>
      <Menu.Item key="summary" icon={<DashboardOutlined />}>
        <Link to={AppRoutePaths.SUMMARY}>Summary</Link>
      </Menu.Item>
      <SubMenu key="SubMenu" icon={<QuestionCircleOutlined />} title="Help" className="ml-auto">
        <Menu.Item key="docs">Docs</Menu.Item>
        <Menu.Item key="slack">Slack</Menu.Item>
      </SubMenu>
      <SubMenu key="user" icon={<UserOutlined />} title={user?.name}>
        <Menu.Item key="logout">Log Out</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default TopNav;
