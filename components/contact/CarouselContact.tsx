import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

function CarouselContact() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false
  }

  const images = Array.from(
    {length: 10},
    (_, i) => `/images/photo-${i + 1}.png`
  )

  return (
    <div>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`photo-${index + 1}`}
              className="w-full h-auto my-0"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselContact
