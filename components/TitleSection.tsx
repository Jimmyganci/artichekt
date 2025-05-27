import Skew from './layouts/Skew'

function TitleSection({
  title,
  primary,
  position = 'left'
}: {
  title: string
  primary: boolean
  position?: 'left' | 'right'
}) {
  let row = 'flex-row-reverse'
  let textAlign = 'text-start'
  if (position === 'right') {
    row = 'flex-row'
    textAlign = 'text-end'
  }

  const titleSplitted = title.split(' ')
  return (
    <div className={`flex ${row} justify-end`}>
      <h2
        className={`${primary ? 'text-primary' : 'text-black'} ${titleSplitted.length > 1 ? '-mr-5' : '-ml-5 mt-6'}  mt-0 mb-0 uppercase text-2xl sm:text-6xl ${textAlign}`}
      >
        <span>
          {titleSplitted.length > 1
            ? titleSplitted.map((word, index) => (
                <div key={index}>
                  {word}
                  <br />
                </div>
              ))
            : title}
        </span>
      </h2>
      <Skew
        style={titleSplitted.length > 1 ? '-mt-5' : 'mt-[47px] sm:mt-[38px]'}
      />
    </div>
  )
}

export default TitleSection
