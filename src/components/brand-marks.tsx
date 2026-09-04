/* 결제사 마크. 공식 로고 파일이 아니라 브랜드 색과 글자꼴을 딴 대체 표기다.
   실제 서비스에 쓸 때는 각 사의 브랜드 가이드에서 받은 원본 에셋으로 교체할 것. */

type P = React.SVGProps<SVGSVGElement>;
const chip = { viewBox: "0 0 28 28", width: 28, height: 28 };
const word = {
  textAnchor: "middle" as const,
  fontFamily: "inherit",
  fontWeight: 800,
  letterSpacing: "-0.6",
};

export const TossMark = (p: P) => (
  <svg {...chip} {...p}>
    <rect width="28" height="28" rx="7.5" fill="#0064ff" />
    <text {...word} x="14" y="18.2" fontSize="10.6" fill="#fff">
      toss
    </text>
  </svg>
);

export const KakaoPayMark = (p: P) => (
  <svg {...chip} {...p}>
    <rect width="28" height="28" rx="7.5" fill="#ffeb00" />
    <text {...word} x="14" y="18.4" fontSize="11.4" fill="#000">
      pay
    </text>
  </svg>
);

export const NaverPayMark = (p: P) => (
  <svg {...chip} {...p}>
    <rect width="28" height="28" rx="7.5" fill="#03c75a" />
    <path fill="#fff" d="M8.7 8.3h4.1l3 4.6V8.3h3.5v11.4h-4.1l-3-4.6v4.6H8.7Z" />
  </svg>
);
