function Skew({style}: {style?: string}) {
  return (
    <div
      className={`${style ? style : ''} pl-20 sm:pl-24 -z-10 w-[10%] h-8 sm:h-16 bg-primary -skew-y-[35deg]`}
    ></div>
  )
}

export default Skew
