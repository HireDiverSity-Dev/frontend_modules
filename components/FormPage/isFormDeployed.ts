import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';

export default function isFormDeployed(props: FormPageProps) {
  console.log(props.isDeployed, props.startDate, props.endDate);
  if (props.isDeployed === true) return true;

  if (props.startDate === undefined) return false;
  const nowDate = new Date();
  const startDate = new Date(props.startDate);
  if (nowDate < startDate) return false;

  if (props.endDate === undefined) return true;
  const endDate = new Date(props.endDate);
  if (nowDate > endDate) return false;
  return true;
}
