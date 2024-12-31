import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { HomeCarousal } from '../../utils/carousal/HomeCarousal';

export function Caroudal() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className=" h-[650px]">
        {HomeCarousal.map((img) => (
          <CarouselItem key={img.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center aspect-square p-0 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-full rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
