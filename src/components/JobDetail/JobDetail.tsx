import { useJob } from '@/hooks/useJobs';
import { useMatch } from 'react-location';
function JobDetail() {
  const jobId: string = useMatch().params.jobId;
  const { data = null } = useJob(jobId);
  return <div className="flex flex-col h-full" />;
}
export default JobDetail;
