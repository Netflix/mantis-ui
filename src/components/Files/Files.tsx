import { Helmet } from 'react-helmet-async';
import { Tabs } from 'antd';
import { Outlet, useMatches, useNavigate } from 'react-location';

function Files() {
  const { TabPane } = Tabs;
  const navigate = useNavigate();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const onChange = (key: string) => {
    navigate({ to: key });
  };

  return (
    <>
      <Helmet>
        <title>Mantis - Files</title>
      </Helmet>
      <div className="m-4 flex flex-col h-full">
        <Tabs
          activeKey={match.pathname.substring(
            match.pathname.lastIndexOf('/') + 1,
            match.pathname.length,
          )}
          type="card"
          onChange={onChange}
        >
          <TabPane tab="Upload" key="upload" />
          <TabPane tab="Files List" key="list" />
        </Tabs>
        <Outlet />
      </div>
    </>
  );
}

export default Files;
