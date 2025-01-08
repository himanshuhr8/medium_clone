import { Link } from "react-router-dom";

interface HeadingProps {
  label: string;
  toText: string;
  to: string;
}
export const Heading: React.FC<HeadingProps> = ({ label, toText, to }) => {
  return (
    <div className="px-10">
      <div className="text-3xl font-extrabold">Create an Account</div>
      <div className="text-slate-400">
        {label}
        <Link className="pl-2 underline" to={to}>
          {toText}
        </Link>
      </div>
    </div>
  );
};
