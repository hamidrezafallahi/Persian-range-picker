import { DesktopDate } from "../desktopDate";
import { MobileDate } from "../mobileDate";

export function DatePicker({ ...props }) {
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";

  return (
    <>
      {deviceType == "desktop" ? (
        <DesktopDate {...props} />
      ) : (
        <MobileDate {...props} />
      )}
    </>
  );
}
