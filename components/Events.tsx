// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import "@/app/events.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import pinkStar from "@/assets/images/HeroSectionImages/star bg.png";
import Image from "next/image";

import pinkPlanet from "@/assets/images/HeroSectionImages/pink planet.png";
import astro from "@/assets/images/astroNotMoon.png";
import astroMedi from "@/assets/images/astroNot2.png";

// import ass1 from "@/assets/images/asteroids/ass1.png"
// import ass2 from "@/assets/images/asteroids/ass2.png"
// import ass3 from "@/assets/images/asteroids/ass3.png"
// import ass4 from "@/assets/images/asteroids/ass4.png"
// import ass5 from "@/assets/images/asteroids/ass5.png"
// import ass6 from "@/assets/images/asteroids/ass6.png"
// import ass7 from "@/assets/images/asteroids/ass7.png"
// import ass8 from "@/assets/images/asteroids/ass8.png"
// import ass9 from "@/assets/images/asteroids/ass9.png"
// import assThicc1 from "@/assets/images/asteroids/ass(thicc)1.png"

export default function EventsCopy() {
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef();
  const isPaused = useRef(false);
  let targetAngle = 0;
  // ------------------for rotation constants-----------------------
  const x1 = -300,
    x2 = 300;

  const opacityY1 = 20,
    opacityY2 = 100;
  const opacitym = (opacityY2 - opacityY1) / (x2 - x1);

  const scaleY1 = 0.4,
    scaleY2 = 1;
  const scalem = (scaleY2 - scaleY1) / (x2 - x1);

  const blurY1 = 10,
    blurY2 = 0;
  const blurm = (blurY2 - blurY1) / (x2 - x1);

  const events = [
    {
      event: "Decisia",
      punchLine: "Master the art of decision-making!",
      img: "planet_1.png",
    },
    {
      event: "Sparkhack",
      punchLine: "Ignite your ideas, hack the future!",
      img: "planet_2.png",
    },
    {
      event: "Ju Talks",
      punchLine: "Where ideas meet words!",
      img: "planet_3.png",
    },
    {
      event: "Abol Tabol",
      punchLine: "Chaos fuels creativity!",
      img: "planet_4.png",
    },
    {
      event: "Eureka",
      punchLine: "Discover brilliance within!",
      img: "planet_5.png",
    },
    {
      event: "Inquizitive",
      punchLine: "Quench your thirst for knowledge!",
      img: "planet_6.png",
    },
    {
      event: "Circuistics",
      punchLine: "Engineering ideas into circuits!",
      img: "planet_7.png",
    },
    {
      event: "Algomaniac",
      punchLine: "Algorithms, the language of innovation!",
      img: "planet_8.png",
    },
    {
      event: "24 Frames",
      punchLine: "Crafting stories one frame at a time!",
      img: "planet_9.png",
    },
  ];

  const sliderMobileRef = useRef();

  const scrollLeft = () => {
    if (sliderMobileRef.current)
      sliderMobileRef.current.scrollBy({
        left: -sliderMobileRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderMobileRef.current)
      sliderMobileRef.current.scrollBy({
        left: sliderMobileRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    let startX = 0,
      endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = endX - startX;

      if (swipeDistance > 50) {
        pauseAndRotate("left"); // Swipe right to move left
      } else if (swipeDistance < -50) {
        pauseAndRotate("right"); // Swipe left to move right
      }
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const planets = slider.children;
    const totalPlanets = events.length;

    function positionPlanets() {
      const angleStep = 360 / totalPlanets;
      for (let i = 0; i < totalPlanets; i++) {
        const angle = targetAngle + i * angleStep;
        const radian = (angle * Math.PI) / 180;

        const x = Math.sin(radian) * 40; // Radius of the circle
        const z = Math.cos(radian) * x2;
        const y = -z / -3; // Vertical translation based on depth
        // const opacity = 300 + z > 300 ? 100 : (100 + z/3);
        // const opacity =(z/6) + 50;
        const opacity = opacityY1 + opacitym * (z - x1);
        const scale = scaleY1 + scalem * (z - x1);
        const blur = blurY1 + blurm * (z - x1);

        planets[i].style.transform = `translate3d(${x}vw, ${y}px, ${z}px)`;
        // planets[i].style.opacity = `${opacity}%`;
        planets[i].style.scale = `${scale}`;
        planets[i].style.filter = `blur(${blur}px)`;
      }
    }

    function rotateSlider() {
      if (!isPaused.current) targetAngle -= 0.07;
      positionPlanets();
      requestAnimationFrame(rotateSlider);
    }

    positionPlanets();
    rotateSlider();
  }, []);

  function pauseAndRotate(direction) {
    isPaused.current = true;
    setTimeout(() => {
      isPaused.current = false;
    }, 2000);

    const slider = sliderRef.current;
    const totalPlanets = slider.children.length;
    const angleStep = 360 / totalPlanets;

    // Calculate the new target angle
    const newAngle =
      direction === "right" ? targetAngle - angleStep : targetAngle + angleStep;

    // Interpolate to the new target angle
    function smoothTransition() {
      const diff = newAngle - targetAngle;
      if (Math.abs(diff) > 0.1) {
        targetAngle += diff * 0.1; // Adjust this value to control the smoothness
        positionPlanets();
        requestAnimationFrame(smoothTransition);
      } else {
        targetAngle = newAngle;
        positionPlanets();
      }
    }

    smoothTransition();
  }

  function positionPlanets(planets, totalPlanets) {
    const angleStep = 360 / totalPlanets;
    for (let i = 0; i < totalPlanets; i++) {
      const angle = targetAngle + i * angleStep;
      const radian = (angle * Math.PI) / 180;

      const x = Math.sin(radian) * 300;
      const z = Math.cos(radian) * 50;
      const y = -z / -3;

      planets[i].style.transform = `translate3d(${x}px, ${y}px, ${z}vw)`;
    }
  }

  return (
    <div id="events" className=" relative text-white py-8  md:py-16">
      {/* -----------------pink Stars ---------- */}
      <div className="absolute bg-darkBlue top-0 left-0 w-full h-full  -z-30"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2  animate-twinkle -z-20">
        <Image
          src={pinkStar}
          alt="Picture pink stars"
          className="absolute object-cover w-full h-full"
        />
      </div>

      {/* ------------------------------space elements --------------------- */}
      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
        <div className="relative w-full h-full">
          {/* -----------astronut------------- */}
          <div className="md:block hidden">
            <Image
              src={astroMedi}
              alt="Blue Planets"
              className="absolute right-[5%] sm:block hidden bottom-[2%] animate-float  w-32 object-cover"
            ></Image>
          </div>

          {/* -----------leftbottom pink planet------------- */}
          <div>
            <Image
              src={pinkPlanet}
              alt="Blue Planets"
              className="absolute sm:block hidden left-[10%] bottom-[5%] animate-spin-slow-ccw  w-16 object-cover"
            ></Image>
          </div>
          {/* -----------right top pink planet------------- */}
          <div className="md:block hidden">
            <Image
              src={pinkPlanet}
              alt="pink Planet"
              className="absolute right-[27%] top-[10%] animate-float-slow w-12 object-cover"
            ></Image>
          </div>

          {/* -----------astronaut------------- */}
          <div className="md:block hidden">
            <Image
              src={astro}
              alt="Blue red Planets"
              className="absolute left-[12%] top-[15%] sm:bottom-[32%] animate-float-slow w-20  sm:w-24 object-cover"
            ></Image>
          </div>
        </div>
      </div>

      {/* ------------------for desktop screens------------------------- */}
      <div className="carousel3 h-[90vh] hidden md:flex overflow-hidden md:overflow-visible flex-col items-start justify-center py-12 relative z-10">
        <h1 className="text-4xl absolute top-10 w-full text-center font-bold">
          Events
        </h1>

        <div
          className="slider3 bg-no-repeat bg-center bg-contain sun"
          ref={sliderRef}
          style={{ backgroundImage: `url('/sun.png')` }}
        >
          {events.map((src, index) => (
            <div
              className="planet "
              key={index}
              onMouseEnter={() => (isPaused.current = true)}
              onMouseLeave={() => (isPaused.current = false)}
            >
              <img
                className="h-[15vw] w-auto"
                src={`eventPlanets/` + src.img}
                alt={`Planet ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="buttons lg:block hidden absolute w-full">
          <button
            onClick={() => pauseAndRotate("right")}
            className="absolute right-10 text-6xl hover:text-white duration-200 rounded-full text-white/80 p-2 top-1/2 -translate-y-1/2"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => pauseAndRotate("left")}
            className="absolute left-10 text-6xl hover:text-white duration-200  rounded-full text-white/80  top-1/2 -translate-y-1/2"
          >
            <FaChevronLeft />
          </button>
        </div>
      </div>

      {/* ---------------------for tab-mobile ------------------------ */}
      <div className="md:hidden py-12 block">
        <h1 className="text-4xl  text-center font-bold">Events</h1>
        <div className="relative mt-6" 
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}>
          <div className="flex items-center gap-x-0 overflow-x-scroll scrollbar-hide px-4" ref={sliderMobileRef}>
            {events.map((eventDetails,index) => {
              return (

              <div key={eventDetails.event} className="text-white py-4 px-2  rounded-xl flex flex-col items-center animate-float-medium delay-75  min-w-[200px]" style={{ animationDelay: `${ Math.random()}s` }}>
                <img
                  src={`mobileEventPlanets/` + eventDetails.img}
                  className="object-cover "
                  height={400}
                  width={400}
                  alt={eventDetails.event}
                ></img>
                {/* <h1 className="mt-2 text-center">{eventDetails.punchLine}</h1> */}
              </div>
              )
            })}
          </div>


          {/* ---------hover buttons-------------- */}
          {showArrows &&(<>
          <button
            className="absolute top-28  left-2 hidden sm:flex items-center justify-center 
            size-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-95 text-darkBlue z-10
            "
            onClick={scrollLeft}
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            className="absolute top-28  right-2 hidden sm:flex items-center justify-center
            size-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-95 text-darkBlue z-10
            "
            onClick={scrollRight}
          >
            <FaChevronRight size={24} />
          </button>
          </>)}
        </div>
      </div>
    </div>
  );
}
