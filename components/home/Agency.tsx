'use client'
import React from 'react'
import ScrollTextAppear from '../ScrollTextAppear'

function Agency() {
  const link = {path: '/lagence', name: "L'agence"}
  const content = `Notre agence propose une expertise technique solide qui s’appuie sur
    un réseau de professionnels compétents tout en développant une
    approche innovante et pluridisciplinaire.`

  return <ScrollTextAppear primary link={link} content={content} />
}

export default Agency
