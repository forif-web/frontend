const SpaceVertical = ({ size, className }: { size: number, className?: string }) => {
  return (
    <div style={{ height: `${size}px` }} className={`w-full ${className}`}></div>
  )
}

const SpaceHorizontal = ({ size, className }: { size: number, className?: string }) => {
  return (
    <div style={{ width: `${size}px` }} className={`h-full ${className}`}></div>
  )
}

const Space = {
  Vertical: SpaceVertical,
  Horizontal: SpaceHorizontal
}

export default Space;