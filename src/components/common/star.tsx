const Star = ({
  fillColor,
  className,
}: {
  fillColor: string;
  className: any;
}) => (
  <svg
    width={"30px"}
    height={"30px"}
    viewBox="0 0 100 100"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="45" width="10" height="100" fill={fillColor} />
    <rect
      y="55"
      width="10"
      height="100"
      transform="rotate(-90 0 55)"
      fill={fillColor}
    />
    <rect
      x="11"
      y="18.0711"
      width="10"
      height="100"
      transform="rotate(-45 11 18.0711)"
      fill={fillColor}
    />
    <rect
      x="18.071"
      y="88.7817"
      width="10"
      height="100"
      transform="rotate(-135 18.071 88.7817)"
      fill={fillColor}
    />
    <rect
      y="55"
      width="10"
      height="100"
      transform="rotate(-90 0 55)"
      fill={fillColor}
    />
  </svg>
);
export default Star;
