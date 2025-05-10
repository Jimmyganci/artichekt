'use client'
import Image from 'next/image';
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

function GoogleReview() {
    const featurableWidgetId = "cb90d218-01b6-4a5a-9f27-a4c36f8909b5";

    function getRelativeTimeFromNow(dateString: any) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: 'an', seconds: 31536000 },
    { label: 'mois', seconds: 2592000 },
    { label: 'semaine', seconds: 604800 },
    { label: 'jour', seconds: 86400 },
    { label: 'heure', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'seconde', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`;
    }
  }
  return "à l'instant";
}
    
  return (
    <div className="px-32 mb-80">
      <h4 className="flex flex-col text-8xl font-fontBold">
        <span>ILS NOUS</span>
        <span>ONT FAIT</span>
        <span>CONFIANCE</span>
      </h4>
      <div className='bg-grey px-4 py-6'>
        <Image
          src="/images/google.svg"
          alt="Google reviews"
          className='w-72 mx-auto'
          width={600}
          height={400}
        />
        <ReactGoogleReviews maxItems={2} readMoreLabel='Voir plus' getRelativeDate={(date) => getRelativeTimeFromNow(date)} carouselSpeed={4000} layout="carousel" featurableId={featurableWidgetId} />
      </div>
    </div>
  )
}

export default GoogleReview
