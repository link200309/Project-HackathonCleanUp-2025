import { useId } from "react";
import PropTypes from "prop-types";

export function Recolector({ size = 240, animate = true, className = "" }) {
  const id = useId();
  const clipId = `r-head-clip-${id}`;
  return (
    <svg
      className={`char recolector ${className}`}
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label="Persona recolectora con contenedor de reciclaje"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="120" cy="70" r="44" />
        </clipPath>
      </defs>

      {/* cuerpo */}
      <g>
        <rect x="60" y="110" width="120" height="80" rx="20" fill="#6FCF97" />

        {/* brazo izquierdo */}
        <g
          className="wave-left"
          style={{
            transformOrigin: "11px 30px",
            transition: "transform 0.25s",
          }}
          transform="translate(40,110)"
        >
          <rect x="0" y="10" width="22" height="56" rx="10" fill="#F0C987" />
          <circle cx="11" cy="72" r="10" fill="#F0C987" />
        </g>

        {/* brazo derecho sosteniendo cubo */}
        <g transform="translate(150,100)">
          <rect x="0" y="10" width="18" height="56" rx="9" fill="#F0C987" />
          <circle cx="9" cy="72" r="10" fill="#F0C987" />
          <rect x="-6" y="52" width="46" height="36" rx="6" fill="#2F80ED" />
          <text x="2" y="76" fill="#fff" fontSize="12" fontWeight="700">
            REC
          </text>
        </g>
      </g>

      {/* cabeza */}
      <g clipPath={`url(#${clipId})`}>
        <circle cx="120" cy="70" r="44" fill="#F6D8B8" />
        <ellipse cx="120" cy="84" rx="28" ry="10" fill="#000" opacity="0.06" />
        {/* pelo */}
        <path d="M84 50 q20 -30 72 -18 q-6 20 -72 18z" fill="#2D2B2F" />

        {/* ojos */}
        <g transform="translate(96,64)" className="eye-left">
          <circle cx="12" cy="6" r="6" fill="#fff" />
          <circle cx="12" cy="6" r="3" fill="#2D2B2F" />
        </g>
        <g transform="translate(132,64)" className="eye-right">
          <circle cx="12" cy="6" r="6" fill="#fff" />
          <circle cx="12" cy="6" r="3" fill="#2D2B2F" />
        </g>

        {/* sonrisa */}
        <path
          d="M104 84 q16 14 32 0"
          stroke="#2D2B2F"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {animate && (
        <style>{`
          .recolector .wave-left { 
            animation: r-wave 2.5s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95); 
            transform-origin: 11px 30px; 
          }
          .recolector { 
            animation: r-float 4s infinite ease-in-out; 
          }
          .recolector .eye-left circle:last-child,
          .recolector .eye-right circle:last-child {
            animation: r-blink 4s infinite ease-in-out;
          }
          @keyframes r-wave { 
            0%, 100% { transform: rotate(0deg); } 
            25% { transform: rotate(-18deg); } 
            50% { transform: rotate(-8deg); }
            75% { transform: rotate(-15deg); }
          }
          @keyframes r-float { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-8px); } 
          }
          @keyframes r-blink {
            0%, 90%, 100% { transform: scaleY(1); opacity: 1; }
            92%, 96% { transform: scaleY(0.1); opacity: 0.3; }
          }
        `}</style>
      )}
    </svg>
  );
}

Recolector.propTypes = {
  size: PropTypes.number,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export function Nina({ size = 220, animate = true, className = "" }) {
  return (
    <svg
      className={`char nina ${className}`}
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label="Niña reciclando una botella"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="60" y="120" rx="18" width="120" height="70" fill="#FFD28A" />
      {/* piernas */}
      <g>
        <rect x="80" y="184" width="18" height="36" rx="8" fill="#3F3D56" />
        <rect x="142" y="184" width="18" height="36" rx="8" fill="#3F3D56" />
      </g>

      {/* brazo con botella */}
      <g
        className="bottle-hand"
        transform="translate(150,120)"
        style={{ transformOrigin: "8px 30px" }}
      >
        <rect x="0" y="10" width="16" height="56" rx="8" fill="#F6D8B8" />
        <rect x="-6" y="48" width="40" height="18" rx="6" fill="#A9E34B" />
        <rect
          x="-2"
          y="4"
          width="8"
          height="20"
          rx="2"
          fill="#CFEF9A"
          transform="rotate(-12 4 14)"
        />
        <text x="-2" y="60" fontSize="10" fill="#fff">
          PET
        </text>
      </g>

      {/* cabeza */}
      <g transform="translate(0,-10)" className="nina-head">
        <circle cx="120" cy="70" r="40" fill="#F6D8B8" />
        <path d="M88 56 q24 -28 64 -6 q-6 18 -64 6z" fill="#FF7BAC" />
        {/* ojos */}
        <circle cx="105" cy="70" r="6" fill="#fff" className="eye-white" />
        <circle cx="105" cy="70" r="3" fill="#2D2B2F" className="eye-pupil" />
        <circle cx="135" cy="70" r="6" fill="#fff" className="eye-white" />
        <circle cx="135" cy="70" r="3" fill="#2D2B2F" className="eye-pupil" />
        {/* boca */}
        <path
          d="M112 86 q8 8 16 0"
          stroke="#2D2B2F"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {animate && (
        <style>{`
          .nina .bottle-hand { 
            animation: n-bottle 2s infinite cubic-bezier(0.4, 0, 0.2, 1); 
          }
          .nina { 
            animation: n-bounce 3s infinite ease-in-out; 
          }
          .nina .nina-head {
            animation: n-head-tilt 3s infinite ease-in-out;
            transform-origin: 120px 110px;
          }
          .nina .eye-pupil {
            animation: n-blink 3.5s infinite ease-in-out;
          }
          @keyframes n-bottle { 
            0%, 100% { transform: translateY(0) rotate(0deg); } 
            25% { transform: translateY(-10px) rotate(-8deg); } 
            50% { transform: translateY(-4px) rotate(-3deg); }
            75% { transform: translateY(-8px) rotate(-6deg); }
          }
          @keyframes n-bounce { 
            0%, 100% { transform: translateY(0px) scale(1); } 
            50% { transform: translateY(-5px) scale(1.02); } 
          }
          @keyframes n-head-tilt {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-3deg); }
          }
          @keyframes n-blink {
            0%, 88%, 100% { transform: scaleY(1); opacity: 1; }
            90%, 94% { transform: scaleY(0.1); opacity: 0.2; }
          }
        `}</style>
      )}
    </svg>
  );
}

Nina.propTypes = {
  size: PropTypes.number,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export function Can({ size = 200, animate = true, className = "" }) {
  return (
    <svg
      className={`char can ${className}`}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Contenedor simpático de reciclaje"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(20,20)" className="can-body">
        <rect x="10" y="40" width="140" height="110" rx="18" fill="#475569" />
        <rect
          x="0"
          y="26"
          width="160"
          height="28"
          rx="10"
          fill="#334155"
          className="can-lid"
        />
        {/* ojitos */}
        <circle cx="50" cy="80" r="10" fill="#fff" className="eye-white" />
        <circle
          cx="50"
          cy="80"
          r="5"
          fill="#0f172a"
          className="eye-pupil-left"
        />
        <circle cx="110" cy="80" r="10" fill="#fff" className="eye-white" />
        <circle
          cx="110"
          cy="80"
          r="5"
          fill="#0f172a"
          className="eye-pupil-right"
        />
        {/* boca */}
        <path
          d="M66 105 q14 12 28 0"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="can-mouth"
        />
        {/* sticker */}
        <circle
          cx="130"
          cy="122"
          r="18"
          fill="#2F80ED"
          className="can-sticker"
        />
        <path d="M122 119 l8 -6 l4 12 l-12 -6" fill="#fff" opacity="0.14" />
      </g>

      {animate && (
        <style>{`
          .can { 
            animation: can-bob 3.5s infinite cubic-bezier(0.4, 0, 0.6, 1); 
          }
          .can .can-body { 
            animation: can-wiggle 2s infinite ease-in-out; 
            transform-origin: 80px 90px;
          }
          .can .can-lid {
            animation: can-lid-bounce 2s infinite ease-in-out;
            transform-origin: 80px 40px;
          }
          .can .eye-pupil-left,
          .can .eye-pupil-right {
            animation: can-look 4s infinite ease-in-out;
          }
          .can .can-sticker {
            animation: can-spin-sticker 8s infinite linear;
            transform-origin: 130px 122px;
          }
          @keyframes can-bob { 
            0%, 100% { transform: translateY(0px); } 
            33% { transform: translateY(-8px); } 
            66% { transform: translateY(-3px); }
          }
          @keyframes can-wiggle { 
            0%, 100% { transform: rotate(0deg); } 
            25% { transform: rotate(-2deg); } 
            75% { transform: rotate(2deg); }
          }
          @keyframes can-lid-bounce {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.95); }
          }
          @keyframes can-look {
            0%, 30%, 100% { transform: translateX(0); }
            10%, 20% { transform: translateX(-2px); }
          }
          @keyframes can-spin-sticker {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      )}
    </svg>
  );
}

Can.propTypes = {
  size: PropTypes.number,
  animate: PropTypes.bool,
  className: PropTypes.string,
};
