import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    title: 'Variety of Styles!',
    text: '"Fantastic shop! Great selection, fair prices, and friendly staff. Highly recommended. The quality of the products is exceptional, and the prices are very reasonable!"',
    author: 'Sybil Sharp',
    avatar: 'images/avatar/user-4.jpg',
    product: 'Contrasting sheepskin sweatshirt',
    price: '$60.00',
  },
  {
    title: 'Quality of Clothing!',
    text: '"I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face."',
    author: 'Mark G.',
    avatar: 'assets/images/beauty10.jpg',
    product: 'Contrasting sheepskin sweatshirt',
    price: '$60.00',
  },
  {
    title: 'Quality of Clothing!',
    text: '"I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face."',
    author: 'Mark G.',
    avatar: 'assets/images/beauty10.jpg',
    product: 'Contrasting sheepskin sweatshirt',
    price: '$60.00',
  },
  {
    title: 'Quality of Clothing!',
    text: '"I absolutely love this shop! The products are high-quality and the customer service is excellent. I always leave with exactly what I need and a smile on my face."',
    author: 'Mark G.',
    avatar: 'assets/images/beauty10.jpg',
    product: 'Contrasting sheepskin sweatshirt',
    price: '$60.00',
  },
];

export default function Testimonial() {
  return (
    <section className="flat-spacing bg-surface">
      <div className="container">
        <div className='heading-section text-center wow fadeInUp'>


          <h3 className="heading">Customer Say!</h3>
          <p className="subheading">Our customers adore our products, and we constantly aim to delight them.</p>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true ,el: ".sw-pagination-latest"}}
          className="tf-sw-testimonial wow fadeInUp" data-wow-delay="0.1s"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="p-4">
              <div className="testimonial-item style-2 style-3">
                <div className='content-top border-0 mb-0'>
                  <div className='box-icon'>
                    <FaQuoteLeft />
                  </div>
                  <h4 className="text-title" style={{ fontWeight: 'bold' }}>{item.title}</h4>
                  <p className="text-secondary">{item.text}</p>

                  <div className="box-author d-flex justify-content-between">
                    <div>
                      <div className="flex items-center gap-2 text-yellow-500 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color="#f0a750" />
                        ))}
                      </div>
                      <div className='text-title author'>{item.author}</div>
                    </div>

                    <img src={item.avatar} alt={item.author} className=" rounded-full" style={{ width: '100px', height: '100px' }} />
                  </div>

                </div>
                <div className="box-avt d-none">
                  <div className="avatar avt-60 round">
                  </div>
                  <div className="box-price">
                    <p class="text-title text-line-clamp-1">Contrasting sheepskin sweatshirt</p>
                    <div class="text-button price">$60.00</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-pagination-latest sw-dots type-circle justify-content-center"></div>

      </div>
    </section>
  );
}