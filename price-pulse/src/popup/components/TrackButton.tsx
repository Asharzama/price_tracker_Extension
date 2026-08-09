type TrackButtonProps = {
  onClick: () => void;
};

export default function TrackButton({
  onClick,
}: TrackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Track Current Product
    </button>
  );
}