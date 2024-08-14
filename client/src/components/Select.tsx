import { ChangeEvent } from "react";

interface Props {
  value?: string | number;
  label: string;
  options: { value?: string | number; name: string }[];
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}
const Select: React.FunctionComponent<Props> = (props) => {
  const { value, label, options, onChange, isDisabled } = props;

  return (
    <div className="w-full flex justify-between items-center gap-4">
      <label className="text-sm font-black text-gray-300 hidden lg:block">
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800 ease-in active:ring-0 active:border-0 p-2"
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
