import {Post} from '@/lib/types'
import Image from 'next/image'

function TargetedLocations({targetedLocations}: {targetedLocations: Post[]}) {
  function displayTagName(name: string) {
    if (name.length < 15) {
      return []
    }
    const nameSplitted = name.split(' ')
    const first = nameSplitted.slice(0, nameSplitted.length - 1).join(' ')
    const second = nameSplitted[nameSplitted.length - 1]
    return [first, second]
  }

  return (
    <div className="mb-40">
      <h1 className="flex flex-col text-5xl sm:text-7xl lg:text-[128px] font-fontBold">
        <span>LES</span>
        <span>ESPACES</span>
        <span>CIBLÉS</span>
      </h1>

      <p className="bg-primary text-white text-lg sm:text-2xl lg:text-4xl w-fit max-w-[650px] mt-0 mb-1 p-1 font-bold">
        ARTICHEKT se donne pour mission
      </p>
      <p className="bg-primary text-white text-lg sm:text-2xl lg:text-4xl w-fit max-w-[650px] my-0 p-1 mb-40 lg:mb-5 font-bold">
        la création d’espaces pluriels.
      </p>

      {targetedLocations.length > 0 &&
        targetedLocations.map(
          ({featuredImage, content, title, tags, databaseId}, index) => (
            <article
              key={databaseId}
              className="mb-10 flex flex-col-reverse lg:flex-col"
            >
              <div
                className={`flex flex-col gap-8 items-center sm:px-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="w-full lg:w-1/2">
                  <Image
                    width={600}
                    height={400}
                    className="sm:h-[600px] w-full object-cover filter grayscale"
                    alt={featuredImage.node.altText}
                    src={featuredImage.node.sourceUrl}
                  />
                </div>

                <div
                  className="lg:w-1/2 text-lg sm:text-2xl"
                  dangerouslySetInnerHTML={{__html: content}}
                />
              </div>
              <div
                className={`flex flex-col gap-10  ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-1/2">
                  <h3
                    className={`text-4xl sm:text-5xl text-center lg:text-6xl m-0  ${index % 2 === 0 ? 'lg:text-end' : 'lg:text-start'}`}
                  >
                    {title}
                  </h3>
                </div>
                <div
                  className={`lg:w-1/2 flex items-end justify-center ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
                  style={{gap: tags.nodes.length < 3 ? '6vw' : '3vw'}}
                >
                  {tags &&
                    tags.nodes.length > 0 &&
                    tags.nodes.map((tag) => (
                      <div
                        key={tag.databaseId}
                        className="flex flex-col items-center"
                      >
                        <Image
                          width={87}
                          height={87}
                          src={tag.tagIcon}
                          alt={tag.name}
                          className="m-0 mb-5 w-10 sm:w-20"
                        />
                        <div>
                          {!displayTagName(tag.name).length ? (
                            <p className="text-center bg-primary font-fontBold text-white px-1 text-xs sm:text-xl m-1 mb-8">
                              {tag.name}
                            </p>
                          ) : (
                            displayTagName(tag.name).map((part, index) => (
                              <p
                                key={index}
                                className="text-center bg-primary font-fontBold text-white px-1 text-xs sm=text-xl m-1"
                              >
                                {part}
                              </p>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </article>
          )
        )}
    </div>
  )
}

export default TargetedLocations
