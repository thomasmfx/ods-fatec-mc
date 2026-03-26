export default function Background({ shapes }) {
  return (
    <svg
      viewBox="0 0 400 200" /* Increased height to match your login prototype */
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {shapes}
    </svg>
  );
}
