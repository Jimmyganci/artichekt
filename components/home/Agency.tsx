'use client'
import Scroll2 from '../Scroll2'

function Agency() {
  const content = `Notre agence propose une expertise technique solide qui s’appuie sur
    un réseau de professionnels compétents tout en développant une
    approche innovante et pluridisciplinaire.`

  return (
    <Scroll2
      primary={false}
      name={"L'agence"}
      position="left"
      content={content}
    />
  )
}

export default Agency
