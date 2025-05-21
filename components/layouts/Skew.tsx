function Skew({style}: {style?: string}) {
  return (
    <div
      className={`${style ? style : ''} pl-24 -z-10 w-[8rem] h-16 bg-primary -skew-y-[35deg]`}
    ></div>
  )
}

export default Skew
