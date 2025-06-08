import "./Dropdown.css"

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  label = "Select an option",
  options,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="dropdown-wrapper">
      <select
        className={`dropdown ${value === "" ? "placeholder" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
