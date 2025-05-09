import Image from 'next/image'

function GoogleReview() {
  return (
    <div className="px-32 mb-80">
      <h4 className="flex flex-col text-8xl font-fontBold">
        <span>ILS NOUS</span>
        <span>ONT FAIT</span>
        <span>CONFIANCE</span>
      </h4>
      <div className='bg-grey p-6 flex flex-col items-center min-h-96'>
        <Image
          src="/images/google.svg"
          alt="Google reviews"
          className='w-72'
          width={600}
          height={400}
        />
      </div>
    </div>
  )
}

export default GoogleReview
