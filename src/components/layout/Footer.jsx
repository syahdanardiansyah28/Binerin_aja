import Container from '../common/Container';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-linear-border/70 bg-linear-bg py-8">
      <Container className="flex flex-col gap-4 text-sm text-linear-muted md:flex-row md:items-center md:justify-between">
        <p>Binerin, media belajar evolusi gerbang logika menuju ALU.</p>
        <div className="flex gap-3">
          <button className="hover:text-linear-text" type="button" onClick={() => onNavigate('/tentang')}>
            Tentang
          </button>
          <button className="hover:text-linear-text" type="button" onClick={() => onNavigate('/bantuan')}>
            Bantuan
          </button>
        </div>
      </Container>
    </footer>
  );
}
