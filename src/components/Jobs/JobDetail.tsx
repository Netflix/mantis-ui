import { useParams } from 'react-router-dom';

import { useJob } from '@/hooks/useJobs';

function JobDetail() {
  const { jobId = '', region = '', env = '' } = useParams();

  const { data } = useJob(env, region, jobId);
  console.log(data);

  return <div className="flex h-full flex-col" />;
}
export default JobDetail;
