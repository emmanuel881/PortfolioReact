import { motion } from "framer-motion";

const Timeline = () => {
    const events = [
        { date: "2000 - 2010", title: "Kenya Certificate of Primary Education", description: "Studied at Vitengeni Primary School in Kilifi, Kenya" },
        { date: "2011 - 2014", title: "Kenya Certificate Of Secondary Education", description: "Studied at Kilifi Township Secondary School" },
        { date: "2016 July to May 2017", title: "Certificate Of Public Accountant", description: "Studied at Times Training Center (KASNEB) - Mombasa Kenya" },
        { date: "2017 Febuary to July", title: "Accounting Packages ", description: "Kilifi Collage Of Accountancy-Kilifi, Kenya" },
        { date: "2018 -  2019", title: "Diploma in Project Management", description: "Studied at Kenya Institute Of Management-Mombasa Kenya" },
        { date: "2018 January to May", title: "Certificate Of Public Accountant PART 3", description: "Studied at Times Training center (KASNEB) Mombasa-Kenya" },
        { date: "2019 -  2023", title: "Bachelors Of Commerce(Finance Option)", description: "studied at University Of Nairobi-Mombasa Campus" },
        { date: "2024 - now", title: "Masters in Project Management", description: "Studied at Jomo Kenyatta University Of Agriculture And Technology-Mombasa CBD Campus" }
    ];

    return (
        <section className="max-w-4xl mx-auto p-6 bg-gray-100" id="education">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Journey</h2>
            <div className="relative border-l-4 border-blue-500 pl-6">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        className="mb-10 relative bg-white shadow-lg p-6 rounded-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute -left-5 top-5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
                        <p className="text-sm text-gray-500 font-medium">{event.date}</p>
                        <h3 className="text-2xl font-semibold text-gray-800 mt-1">{event.title}</h3>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
