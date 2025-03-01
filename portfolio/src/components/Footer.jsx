const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold">Martin Muye Munga</h2>
                        <p className="mt-2 text-gray-400">
                            Empowering businesses with financial clarity and insightful audits.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-3 space-y-2">
                            <FooterLink href="#about">About</FooterLink>
                            <FooterLink href="#services">Services</FooterLink>
                            <FooterLink href="#projects">Projects</FooterLink>
                            <FooterLink href="#contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-xl font-semibold">Follow Me</h3>
                        <div className="mt-3 flex justify-center md:justify-start space-x-4">
                            <SocialIcon href="https://linkedin.com" icon="linkedin" />
                            <SocialIcon href="https://twitter.com" icon="twitter" />
                            <SocialIcon href="https://github.com" icon="github" />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Copyright */}
                <p className="text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Martin Muye Munga. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

// Reusable Footer Link Component
const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="text-gray-400 hover:text-white transition duration-300">
            {children}
        </a>
    </li>
);

// Reusable Social Icon Component
const SocialIcon = ({ href, icon }) => {
    const icons = {
        linkedin: "fa-linkedin",
        twitter: "fa-twitter",
        github: "fa-github",
    };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 text-2xl">
            <i className={`fab ${icons[icon]}`}></i>
        </a>
    );
};

export default Footer;
