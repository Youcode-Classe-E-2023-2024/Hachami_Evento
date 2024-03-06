import React from 'react'
import { Link } from 'react-router-dom'
import HeroImg from '../assets/hero.png'

const Home = () => {
    return (
        <div className='flex align-middle p-20' style={{ border: '1px solid green', 'height': '100vh' }}>
                <section className="bg-primary-50 bg-dotted-pattern bg-contain  md:py-28"  >
                    <div className=" flex">
                        <div className="flex flex-col justify-center gap-8 w-2/3" >
                            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
                            <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
                            <button className="font-semibold leading-6 bg-indigo-600 hover:text-white w-32 h-14 p-2" style={{ 'border': '1px solid #fff' }}>
                                <Link href="#events">
                                    Explore Now
                                </Link>
                            </button>
                        </div>

                        <img
                            src={HeroImg}
                            // style={{ width: "100%", height: "100%" }}
                            alt="hero"
                            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] "
                        />
                    </div>
                </section>
            </div>
    )
}

export default Home
