const ProfileDetails = () => {
    return (
        <section id="profile" className=" py-10 mt-24 mb">
            <h2 className="text-[70px] w-full text-center">About Me</h2>

            <div className="flex flex-col md:flex-row items-center justify-center mt-10 space-y-6 md:space-y-0 md:space-x-10 0 ">
                {/* Text Content */}
                <div className="md:w-1/2 flex flex-col items-center justify-center  h-100 md:items-start text-justify px-6">
                    <p className="text-lg">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Voluptatibus reiciendis quasi laboriosam voluptatum enim recusandae cum asperiores,
                        at aspernatur tempora quam natus id, alias aut exercitationem modi veritatis deleniti voluptatem.
                    </p>
                    <button className="bg-blue-500 px-6 py-3 text-white font-bold rounded-lg hover:bg-blue-600 transition w-40 mt-4 mx-auto ">
                        Download CV
                    </button>
                </div>


                {/* Image Container (Centered & Rounded) */}
                <div className="flex justify-center md:w-1/2">
                    <img
                        src="/profile.jpeg"
                        alt="Profile Image"
                        className="w-120 h-120 object-cover rounded-4xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default ProfileDetails;
