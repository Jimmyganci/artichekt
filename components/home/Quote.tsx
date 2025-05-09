'use client'
import Scroll3 from '../Scroll3'

function Quote() {
  const content = `Révéler la singularité de chaque lieu et réfléchir à des espaces fonctionnels et esthétiques qui répondent à des usages au service de la transition écologique figurent parmi les objectifs premiers de l’agence ARTICHEKT."`

  return <Scroll3 primary={false} content={content} position="left" />
}

export default Quote
