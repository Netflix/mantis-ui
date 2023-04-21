import { Button, Container, Loader, Tabs } from '@mantine/core';
import { useParams } from 'react-router-dom';

import JobDescriptionTab from '@/components/Jobs/JobDescriptionTab';
import JobOverviewTab from '@/components/Jobs/JobOverviewTab';
import { useAuth } from '@/hooks/useAuth';
import { useJob, useKillJobMutation } from '@/hooks/useJobs';

export default function JobDetails() {
  const { jobId = '', region = '', env = '' } = useParams();
  const { data: jobData } = useJob(env, region, jobId);
  const { mutate } = useKillJobMutation();
  const { user } = useAuth();

  const tabs: string[] = ['Overview', 'Job Description', 'Stage Details', 'Job Status Output'];
  const items = tabs.map((tab) => (
    <Tabs.Tab className={`rounded-lg bg-transparent text-gray-500`} value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  if (!jobData) {
    return (
      <div className={'flex h-screen w-full flex-row items-center justify-center'}>
        <Loader />
      </div>
    );
  }
  return (
    <div className={'w-full'}>
      <div className={'absolute right-0 top-0 my-12 ml-auto mr-10 flex flex-row'}>
        {jobData.job.jobMetadata.state.toLowerCase() === 'launched' && user && (
          <Button
            color="red"
            className="my-2 ml-auto"
            onClick={() =>
              mutate({
                jobs: [{ ...jobData.job, jobId: jobData.job.jobMetadata.jobId }],
                userEmail: user.email,
              })
            }
          >
            Kill Job
          </Button>
        )}
      </div>

      {jobData && (
        <Container className={'my-10'} size={'xl'}>
          <Tabs defaultValue="Overview" variant="pills">
            <Tabs.List className={'flex justify-between'} position="apart">
              {items}
            </Tabs.List>

            <Tabs.Panel value="Overview">
              <JobOverviewTab jobData={jobData} />
            </Tabs.Panel>
            <Tabs.Panel value="Job Description">
              <JobDescriptionTab jobData={jobData} />
            </Tabs.Panel>

            <Tabs.Panel value="Stage Details">
              <div>Stage details</div>
            </Tabs.Panel>

            <Tabs.Panel value="Job Status Output">
              <div>Job output</div>
            </Tabs.Panel>
          </Tabs>
        </Container>
      )}
    </div>
  );
}
