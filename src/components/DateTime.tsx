import { format } from 'date-fns';

function DateTime({ date }: { date: Date | number }) {
  const formattedDate = date ? format(date, 'MMM d, yyyy') : '';
  const formattedTime = date ? format(date, 'hh:ss a') : '';
  return (
    <div className="my-2">
      <p className="m-0 text-sm">{formattedDate}</p>
      <p className="m-0 text-xs">{formattedTime}</p>
    </div>
  );
}

export default DateTime;
