import React from 'react'
import ScrollTextAppear from '../ScrollTextAppear'

function Approch() {
  const link = {path: '/missions-et-valeurs', name: "L'approche"}
  const content = `Révéler la singularité de chaque lieu et réfléchir à des espaces fonctionnels et esthétiques sui répondent à des usages au service de la transition écologique.`

  return <ScrollTextAppear link={link} content={content} primary={false} />
}

export default Approch
