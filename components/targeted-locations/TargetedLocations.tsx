import {Post} from '@/lib/types'
import Image from 'next/image'
import React from 'react'

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
      <h1 className="flex flex-col text-[128px] font-fontBold">
        <span>LES</span>
        <span>ESPACES</span>
        <span>CIBLÉS</span>
      </h1>

      <p className="bg-primary text-white text-4xl min-w-1/2 max-w-[650px] mt-0 mb-1 p-1 font-bold">
        ARTICHEKT se donne pour mission
      </p>
      <p className="bg-primary text-white text-4xl min-w-1/2 max-w-[650px] my-0 p-1 mb-5 font-bold">
        la création d’espaces pluriels.
      </p>

      {targetedLocations.length > 0 &&
        targetedLocations.map(
          ({featuredImage, content, title, tags, databaseId}, index) => (
            <article key={databaseId} className="mb-10">
              <div
                className={`flex gap-8 items-center px-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2">
                  <Image
                    width={600}
                    height={400}
                    className="h-[600px] object-cover"
                    alt={featuredImage.node.altText}
                    src={featuredImage.node.sourceUrl}
                  />
                </div>

                <div
                  className="w-1/2 text-2xl"
                  dangerouslySetInnerHTML={{__html: content}}
                />
              </div>
              <div
                className={`flex gap-5  ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2">
                  <h3
                    className={`text-7xl m-0  ${index % 2 === 0 ? 'text-end' : 'text-start'}`}
                  >
                    {title}
                  </h3>
                </div>
                <div
                  className={`w-1/2 flex items-end ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
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
                          className="m-0 mb-5 w-20"
                        />
                        <div>
                          {!displayTagName(tag.name).length ? (
                            <p className="text-center bg-primary font-fontBold text-white px-1 text-xl m-1 mb-8">
                              {tag.name}
                            </p>
                          ) : (
                            displayTagName(tag.name).map((part, index) => (
                              <p
                                key={index}
                                className="text-center bg-primary font-fontBold text-white px-1 text-xl m-1"
                              >
                                {part}
                              </p>
                            ))
                          )}
                        </div>
                        {/* <p className="text-center bg-primary font-fontBold text-white px-1 text-xl">
                        {tag.name}
                      </p> */}
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
