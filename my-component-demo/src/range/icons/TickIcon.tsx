interface ITickIconProps {
  accentColor?: string;
}

export const TickIcon = ({
  accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
}: ITickIconProps) => {
  return (
    <svg
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.00041L4.53553 8.53594L11.6058 1.46484"
        stroke={`${accentColor}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
