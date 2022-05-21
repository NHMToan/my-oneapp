import { Box } from "@mui/material";
// @mui
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

// ----------------------------------------------------------------------

interface LogoProps {
  sx?: object;
  disabledLink?: boolean;
  size?: any;
  compact?: boolean;
}
export default function Logo({
  disabledLink = false,
  sx,
  size = 60,
  compact,
}: LogoProps) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;
  const logo = (
    <Box sx={{ width: size, height: size, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="200%"
        height="100%"
        viewBox="0 0 200.000000 80.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient
            id="BG2"
            x1="0.8146601955249185"
            x2="0.18533980447508147"
            y1="0.8885729807284856"
            y2="0.11142701927151444"
          >
            <stop offset="0" stopColor={PRIMARY_MAIN}></stop>
            <stop offset="1" stopColor={PRIMARY_LIGHT}></stop>
          </linearGradient>
          <filter
            id="editing-glowing"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feMerge>
              <feMergeNode in="blur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g
          transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
          fill="url(#editing-glowing)"
          stroke="none"
        >
          <path
            d="M224 728 c-95 -101 -164 -190 -164 -210 0 -16 27 -47 91 -103 50 -44
99 -84 109 -89 17 -7 39 10 137 104 129 125 136 132 127 152 -8 21 -230 178
-251 178 -11 0 -33 -15 -49 -32z"
            fill="url(#BG2)"
          />
          <path
            d="M961 519 c-65 -26 -104 -158 -63 -209 36 -45 125 -22 157 41 22 41
25 134 5 153 -20 21 -69 28 -99 15z m57 -94 c-5 -58 -28 -95 -59 -95 -34 0
-35 58 -2 123 9 19 21 27 39 27 26 0 26 -1 22 -55z"
            fill="url(#BG1)"
          />
          <path
            d="M1196 463 c-4 -4 -22 -6 -40 -5 l-34 2 -17 -72 c-9 -40 -19 -79 -21
-86 -3 -9 4 -12 23 -10 23 3 28 10 38 53 13 61 21 75 42 75 16 0 15 -3 -4
-102 -5 -25 -2 -28 19 -28 23 0 26 6 37 57 15 79 14 101 -8 113 -23 12 -26 12
-35 3z"
            fill="url(#BG1)"
          />
          <path
            d="M1333 460 c-45 -18 -77 -106 -53 -149 10 -19 18 -22 63 -19 39 2 53
7 55 20 2 13 -5 17 -35 20 -49 4 -49 22 0 26 67 6 89 80 30 103 -28 11 -31 11
-60 -1z m47 -49 c0 -11 -39 -25 -47 -18 -3 3 -2 10 2 16 8 13 45 15 45 2z"
            fill="url(#BG1)"
          />
          <path
            d="M1503 460 c-45 -18 -77 -106 -54 -148 9 -18 20 -21 71 -21 46 1 60 4
64 17 10 36 29 143 25 146 -11 9 -87 13 -106 6z m51 -67 c-13 -53 -64 -87 -64
-43 0 37 22 70 47 70 20 0 23 -3 17 -27z"
            fill="url(#BG1)"
          />
          <path
            d="M1703 463 c-48 -5 -42 7 -81 -161 l-19 -83 25 3 c20 2 28 11 34 36 8
28 12 32 44 32 62 0 92 46 85 130 -2 23 -27 53 -40 48 -3 -1 -25 -3 -48 -5z
m38 -73 c-5 -39 -20 -60 -42 -60 -18 0 -20 4 -14 33 9 40 24 59 44 55 11 -2
15 -12 12 -28z"
            fill="url(#BG1)"
          />
          <path
            d="M1916 463 c-4 -4 -22 -6 -40 -5 l-33 2 -22 -97 c-12 -54 -25 -108
-28 -120 -4 -19 -1 -23 20 -23 22 0 27 6 33 35 6 33 9 35 43 35 52 0 82 34 89
98 4 43 1 51 -19 66 -26 18 -32 19 -43 9z m14 -62 c0 -37 -19 -71 -40 -71 -25
0 -27 35 -4 68 19 27 44 29 44 3z"
            fill="url(#BG1)"
          />
          <path
            d="M40 447 c0 -7 9 -62 20 -122 14 -78 27 -117 44 -140 41 -53 127 -145
137 -145 16 0 10 177 -6 218 -15 34 -170 202 -187 202 -5 0 -8 -6 -8 -13z"
            fill="url(#BG2)"
          />
          <path
            d="M485 349 c-82 -39 -158 -79 -168 -88 -14 -14 -19 -40 -24 -124 -5
-81 -3 -107 6 -107 26 0 293 126 302 142 13 24 58 236 51 242 -9 10 -11 9
-167 -65z"
            fill="url(#BG2)"
          />
        </g>
      </svg>
    </Box>
  );

  const logoCompact = (
    <Box sx={{ width: size, height: size, ...sx }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="-5 0 80.000000 80.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="editing-glowing-gradient"
            x1="0.8146601955249185"
            x2="0.18533980447508147"
            y1="0.8885729807284856"
            y2="0.11142701927151444"
          >
            <stop offset="0" stopColor={PRIMARY_MAIN}></stop>
            <stop offset="1" stopColor={PRIMARY_LIGHT}></stop>
          </linearGradient>
          <filter
            id="editing-glowing"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feMerge>
              <feMergeNode in="blur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g
          transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
          fill="url(#editing-glowing)"
          stroke="none"
        >
          <path
            d="M224 728 c-95 -101 -164 -190 -164 -210 0 -16 27 -47 91 -103 50 -44
99 -84 109 -89 17 -7 39 10 137 104 129 125 136 132 127 152 -8 21 -230 178
-251 178 -11 0 -33 -15 -49 -32z"
            fill="url(#editing-glowing-gradient)"
          />
          <path
            d="M40 447 c0 -7 9 -62 20 -122 14 -78 27 -117 44 -140 41 -53 127 -145
137 -145 16 0 10 177 -6 218 -15 34 -170 202 -187 202 -5 0 -8 -6 -8 -13z"
            fill="url(#editing-glowing-gradient)"
          />
          <path
            d="M485 349 c-82 -39 -158 -79 -168 -88 -14 -14 -19 -40 -24 -124 -5
-81 -3 -107 6 -107 26 0 293 126 302 142 13 24 58 236 51 242 -9 10 -11 9
-167 -65z"
            fill="url(#editing-glowing-gradient)"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{compact ? logoCompact : logo}</>;
  }

  return <RouterLink to="/">{compact ? logoCompact : logo}</RouterLink>;
}
