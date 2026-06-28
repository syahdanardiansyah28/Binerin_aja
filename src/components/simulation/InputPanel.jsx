import Card from '../common/Card';

export default function InputPanel({ title = 'Input', action, children }) {
  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-linear-strong">{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}
