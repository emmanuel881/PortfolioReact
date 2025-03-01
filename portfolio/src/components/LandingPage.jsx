export const LandingPage = () => {
    return (
        <section
            className="relative flex flex-col md:flex-row h-screen items-center justify-center bg-cover bg-center pt-20 px-4"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            {/* Background Overlay with reduced opacity */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl px-8 items-center">
                {/* Image Container (Hidden on Small Screens) */}
                <div className="hidden md:flex w-1/2 items-center justify-center mb-8 md:mb-0">
                    <img
                        src="/landingimage.jpeg"
                        alt="Profile Image"
                        className="w-64 md:w-[400px] h-64 md:h-[400px] object-cover rounded-3xl shadow-lg opacity-90"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left justify-center text-white p-4 md:p-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                        Precision. Integrity. Excellence.
                    </h1>
                    <p className="text-lg md:text-xl font-light mt-4 mb-6">
                        Empowering businesses with insightful audits and financial clarity.
                        Let’s build trust through transparency.
                    </p>
                    <button className="bg-blue-500 px-6 py-3 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-lg">
                        Talk to Me
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
