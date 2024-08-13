import { ChangeEvent } from "react";

interface Props {
  value: string | number;
  label: string;
  options: { value: string | number; name: string }[];
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}
const Select: React.FunctionComponent<Props> = (props) => {
  const { value, label, options, onChange, isDisabled } = props;

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-xs text-gray-300 ml-1">{label}</label>
      <select
        disabled={isDisabled}
        className=" bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800 ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full"
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
