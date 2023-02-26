import { Tabs } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { Outlet, useMatches, useNavigate } from 'react-location';

function Files() {
  const navigate = useNavigate();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const onChange = (key: string) => {
    navigate({ to: `/files/${key}` });
  };
  const activeKey = match.pathname.substring(
    match.pathname.lastIndexOf('/') + 1,
    match.pathname.length,
  );

  return (
    <>
      <Helmet>
        <title>Mantis - Files</title>
      </Helmet>
      <div className="flex flex-col h-full">
        <Tabs className="mb-4" value={activeKey} onTabChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="upload">Upload</Tabs.Tab>
            <Tabs.Tab value="list">Files List</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Outlet />
      </div>
    </>
  );
}

export default Files;
