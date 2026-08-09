type FooterProps = {
  totalTracked: number;
};

export default function Footer({
  totalTracked,
}: FooterProps) {
  return (
    <footer className="border-t border-slate-200 p-4 text-sm text-slate-600">
      Tracked Products:{" "}
      <span className="font-bold">{totalTracked}</span>
    </footer>
  );
}