"use client";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 220 206" className="h-8">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="20"
          d="m10.218 71.495 5.354 71.39c1.852 29.391 26.052 52.383 55.499 52.729h77.844c29.452-.339 53.661-23.332 55.513-52.729l5.354-71.39A56.544 56.544 0 0 0 154.255 10H65.731a56.541 56.541 0 0 0-55.513 61.495Z"
          clipRule="evenodd"
        />
        <path
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="20"
          d="M152.827 67.112a42.836 42.836 0 0 1-64.251 37.096 42.836 42.836 0 0 1-21.417-37.096"
        />
      </svg>
      <h1 className="text-2xl font-semibold">Pettah.js</h1>
    </div>
  );
};

export default Logo;
