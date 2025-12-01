interface IRightChevronProps {
  secondaryColor?: string;
}

export const RightChevron = ({
  secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858
}: IRightChevronProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 8L14 12L10 16"
        stroke={`${secondaryColor}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
