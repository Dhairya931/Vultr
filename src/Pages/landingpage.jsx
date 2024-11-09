import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies'
import faqs from '../data/faq'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job {""}<span className='flex items-center gap-2 sm:gap-6'>and get {""} <img src='/hirrd.png' alt='Hirrd logo' className='h-14 sm:h-24 lg:h-32' /></span></h1>
        <p className='text-gray-300 sm:text-xl text-xs sm:mt-4 lg:text-2xl'>
          Fueling your career journey, connecting recruiters with rising stars.
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        {/* Buttons */}
        <Link to='/jobs'>
          <Button variant="blue" size="xl">Unleash Your Potential</Button>
        </Link>
        <Link to="/post-job">
          <Button size="xl" variant="destructive">Connect with Top Talent</Button>
        </Link>

      </div>
      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10 cursor-grab">
        <CarouselContent className='flex gap-5 sm:gap-20 items-center'>{companies.map(({ name, id, path }) => {
          return (
            <CarouselItem key={id} className=" basis-1/3 lg:basis-1/6">
              <img src={path} alt={name} className='w-full h-full sm:h-14 object-contain' />
            </CarouselItem>
          )
        })}

        </CarouselContent>

      </Carousel>

      {/* banner */}
      {/* <div class="w-full h-screen bg-cover bg-center" style="background-image: url('banner1.jpeg');"></div> */}

      <img src='/banner.svg' className='w-full h-screen bg-cover bg-center' />
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* cards */}
        <Card>
          <CardHeader>
            <CardTitle>For Future Builders</CardTitle>

          </CardHeader>
          <CardContent>
            Find your dream role and unlock your potential.
          </CardContent>

        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Team Builders</CardTitle>

          </CardHeader>
          <CardContent>
            Connect with top candidates to build your dream team.
          </CardContent>

        </Card>

      </section>

      {/* Accordion */}
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item - ${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>


    </main>
  )
}

export default LandingPage
