import { CheckIcon } from "./Icon.jsx";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckIcon width={16} height={16} />
      <span>{message}</span>
    </div>
  );
}
