import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full max-h-[80vh] overflow-hidden">
        <Image
          src="/JB_9186.jpg"
          alt="Stephen & Lisa Wedding"
          width={1600}
          height={900}
          className="w-full h-auto object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide drop-shadow-lg">
            Stephen & Lisa
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-light drop-shadow-md">
            April 2027 · Valencia, Spain
          </p>
        </div>
      </div>

      {/* Invitation Text */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl md:text-4xl font-serif text-rose-900 mb-4">
          You’re Invited
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          We can’t wait to celebrate our special day with our closest friends
          and family. Join us in beautiful Valencia for a weekend full of love,
          laughter, and memories to last a lifetime.
        </p>

        {/* RSVP Button */}
        <button className="mt-8 px-8 py-3 bg-rose-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-rose-600 hover:scale-105 transform transition duration-300">
          RSVP Here
        </button>
      </section>
    </div>
  );
}
