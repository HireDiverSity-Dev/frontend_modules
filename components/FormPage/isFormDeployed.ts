import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';

export default function isFormDeployed(props: FormPageProps) {
  if (props.startDate === undefined || props.startDate === '') return false;
  const nowDate = new Date();
  const startDate = new Date(props.startDate);
  if (nowDate < startDate) return false;

  if (props.endDate === undefined || props.endDate === '') return true;
  const endDate = new Date(props.endDate);
  if (nowDate > endDate) return false;
  return true;
}
