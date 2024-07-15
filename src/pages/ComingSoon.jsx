import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let dest = new Date("August 15, 2024 23:59:59").getTime();
      let now = new Date().getTime();
      let diff = dest - now;

      if (diff <= 0) {
        let nextMonthDate = new Date();
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

        if (nextMonthDate.getMonth() === 0) {
          nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
        }

        dest = nextMonthDate.getTime();
        return;
      }

      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days < 10) days = `0${days}`;
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-zinc-900 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
          <div className="flex-col justify-end items-center lg:gap-16 gap-10 flex">
            {/* <img src="https://pagedone.io/asset/uploads/1717500460.png" alt="pagedone logo image" /> */}
            <div className="flex items-center text-black dark:text-white">
                <FontAwesomeIcon icon={faCoins} className="h-8"/>
                <span className="ml-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    MICROCASINO
                </span>
            </div>
            <div className="flex-col justify-center items-center gap-10 flex">
              <div className="flex-col justify-start items-center gap-2.5 flex">
                <h2 className="text-center text-emerald-400 text-4xl md:text-6xl font-bold font-manrope leading-normal"> 
                    Próximamente 
                </h2>
                <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                    ¡Solo quedan {timeLeft.days} días hasta la gran revelación de nuestro nuevo Juego!
                </p>
              </div>
              <div className="flex items-start justify-center w-full gap-2 count-down-main">
                <div className="timer flex flex-col gap-0.5">
                  <div>
                    <h3 className="countdown-element days text-center text-white text-2xl font-bold font-manrope leading-9">{timeLeft.days}</h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">Días</p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
                <div className="timer flex flex-col gap-0.5">
                  <div>
                    <h3 className="countdown-element hours text-center text-white text-2xl font-bold font-manrope leading-9">{timeLeft.hours}</h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">Horas</p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
                <div className="timer flex flex-col gap-0.5">
                  <div>
                    <h3 className="countdown-element minutes text-center text-white text-2xl font-bold font-manrope leading-9">{timeLeft.minutes}</h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">Minutos</p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
                <div className="timer flex flex-col gap-0.5">
                  <div>
                    <h3 className="countdown-element seconds text-center text-white text-2xl font-bold font-manrope leading-9">{timeLeft.seconds}</h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">Segundos</p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-center gap-5 flex">
                <h6 className="text-center text-emerald-400 text-base font-semibold leading-relaxed">Fecha de Lanzamiento: 15 de Agosto, 2024</h6>
                {/* <div className="justify-center items-center gap-2.5 flex sm:flex-row flex-col">
                  <input type="text" className="w-80 focus:outline-none px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] text-gray-900 placeholder-gray-400 text-sm font-normal leading-relaxed h-10 bg-white rounded-lg border border-gray-200 justify-start items-center gap-1.5 inline-flex" placeholder="Type your mail..." />
                  <button className="sm:w-fit w-full px-3.5 py-2 bg-emerald-400 hover:bg-emerald-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                    <span className="px-1.5 text-gray-900 text-sm font-medium leading-6 whitespace-nowrap">Notify Me</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm font-normal leading-snug">Ponte en contacto con nosotros: <a href="mailto:microcasino@microcasino.com" className="hover:text-gray-100 transition-all duration-700 ease-in-out"> microcasino@microcasino.com</a></p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
