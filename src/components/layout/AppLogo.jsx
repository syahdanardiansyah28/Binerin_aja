import binerinIcon from '../../../assets/BinerinIcon.png';

export default function AppLogo() {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <img className="h-9 w-9 shrink-0 object-contain" src={binerinIcon} alt="" aria-hidden="true" />
      <p className="truncate text-base font-medium leading-none text-linear-strong">Binerin</p>
    </div>
  );
}
