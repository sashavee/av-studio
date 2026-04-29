export default function Logo({ size = 28 }: { size?: number }) {
  const w = 32;
  const h = w * Math.sqrt(3) / 2; // equilateral

  // Midpoints of each side
  const top   = { x: w / 2, y: 0 };
  const bl    = { x: 0,     y: h };
  const br    = { x: w,     y: h };
  const midL  = { x: w / 4,     y: h / 2 }; // mid of left side
  const midR  = { x: w * 3 / 4, y: h / 2 }; // mid of right side
  const midB  = { x: w / 2,     y: h };      // mid of bottom

  const pts = (pts: {x:number,y:number}[]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      width={size}
      height={Math.round(size * h / w)}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black body — 3 bottom sub-triangles */}
      <polygon points={pts([bl, midL, midB])} fill="var(--fg)" />
      <polygon points={pts([br, midR, midB])} fill="var(--fg)" />
      <polygon points={pts([midL, midR, midB])} fill="var(--fg)" />
      {/* Top triangle — red */}
      <polygon points={pts([top, midL, midR])} fill="var(--gold)" />
    </svg>
  );
}
