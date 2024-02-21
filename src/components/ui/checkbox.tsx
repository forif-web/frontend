import * as React from "react";

export interface CheckBoxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: any;
  id: string;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, onChange, checked, id }, ref) => {
    return (
      <div className="flex flex-row gap-2 items-center">
        <label
          className="relative flex items-center rounded-sm cursor-pointer"
          htmlFor={id}
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative w-6 h-6 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-forif checked:bg-forif checked:before:bg-forif hover:before:opacity-10"
            id={id}
            checked={checked}
            onChange={({ target: { checked } }) => onChange(checked)}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          htmlFor={id}
          className="selcet-none cursor-pointer text-gray-600 text-sm"
        >
          {label}
        </label>
      </div>
    );
  }
);
CheckBox.displayName = "CheckBox";

export { CheckBox };
