import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/hero.png';
import Search from '../UI/Search';
import CategoryFilter from '../UI/CategoryFilter';
import Collection from '../UI/Collection';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';

const Home = () => {
    const { events, setEvents, query, category, currentPage } = useStateContext();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get(`/events?title=${query}&category=${category}&page=${currentPage}`);
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [query, category, currentPage, setEvents]);

  return (
    <>
      <div className="flex align-middle p-20" style={{ height: '76vh' }}>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain md:py-28">
          <div className="flex">
            <div className="flex flex-col justify-center gap-8 w-2/3">
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                Host, Connect, Celebrate: Your Events, Our Platform!
              </h1>
              <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400">
                Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
              </p>
              <Link to="#events">
                <button className="font-semibold leading-6 bg-indigo-600 hover:text-white w-32 h-14 p-2" style={{ border: '1px solid #fff' }}>
                  Explore Now
                </button>
              </Link>
            </div>

            <img
              src={HeroImg}
              alt="hero"
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </section>
      </div>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Search />
          <CategoryFilter />
        </div>

        <Collection data={events.data} currentPage={events.current_page} totalPage={events.last_page} />
      </section>
    </>
  );
};

export default Home;
