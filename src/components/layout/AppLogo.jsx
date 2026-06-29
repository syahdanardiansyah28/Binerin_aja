import binerinIcon from '../../../assets/BinerinIcon.png';

export default function AppLogo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img className="h-11 w-11 shrink-0 object-contain" src={binerinIcon} alt="" aria-hidden="true" />
      <p className="truncate text-base font-medium leading-none text-linear-strong">Binerin</p>
    </div>
  );
}
