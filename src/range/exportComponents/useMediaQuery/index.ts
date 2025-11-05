import {
  useEffect,
  useState,
} from 'react';

export const deviceSizeFinder = {
  XSUP: "(min-width: 	431px)",
  SMUP: "(min-width: 	640px)",
  MDUP: "(min-width: 768px)",
  LGUP: "(min-width: 992px)",
  XLUP: "(min-width: 1024px)",
  XXLUP: "(min-width: 1366px)",
};
export const useMediaQuery = (
  query: "XSUP" | "SMUP" | "MDUP" | "LGUP" | "XLUP" | "XXLUP"
): { match: boolean; loading: boolean } => {

  const [match, setMatch] = useState<boolean>(window.matchMedia("(min-width: 	431px)").matches);
  const [loading, setLoading] = useState(true);
  const media = window.matchMedia(deviceSizeFinder[query]);
  useEffect(() => {
    if (media.matches) {
      setMatch(media.matches);
      setLoading(false);
    }
    const listener = () => {
      setMatch(media.matches);
      setLoading(false);
    };
    media.addListener(listener);
    setLoading(false);
    return () => media.removeListener(listener);
  }, [media]);

  return { match, loading };
};

 
