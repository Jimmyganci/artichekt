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
  let topSkew = 'top-8'
  let textAlign = 'text-start'
  if (position === 'right') {
    row = 'flex-row'
    topSkew = '-top-8'
    textAlign = 'text-end'
  }

  const titleSplitted = title.split(' ')
  return (
    <div className={`flex ${row} justify-end`}>
      <h2
        className={`${primary ? 'text-primary' : 'text-black'} ${titleSplitted.length > 1 ? '-mr-5' : '-ml-5'}  mt-0 mb-0 uppercase text-6xl ${textAlign}`}
      >
        <span>
          {titleSplitted.length > 1
            ? titleSplitted.map((word) => (
                <>
                  {word}
                  <br />
                </>
              ))
            : title}
        </span>
      </h2>
      <Skew style={titleSplitted.length > 1 ? '-mt-5' : 'mt-[38px]'} />
    </div>
  )
}

export default TitleSection
