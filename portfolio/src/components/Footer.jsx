import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
    const [socialLinks, setSocialLinks] = useState(null);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/social-links");
                setSocialLinks(response.data);
            } catch (error) {
                console.error("Failed to fetch social links:", error);
            }
        };

        fetchSocialLinks();
    }, []);

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
                            <FooterLink href="#profile">About</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink> {/* Updated Contact Link */}
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-xl font-semibold">Follow Me</h3>
                        <div className="mt-3 flex justify-center md:justify-start space-x-4">
                            {socialLinks && (
                                <>
                                    <SocialIcon href={socialLinks.linkedIn} icon="linkedin" />
                                    <SocialIcon href={socialLinks.facebook} icon="facebook" />
                                    <SocialIcon href={socialLinks.instagram} icon="instagram" />
                                    <SocialIcon href={socialLinks.twitterX} icon="x" />
                                </>
                            )}
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

// Reusable Footer Link Component (Updated for Internal Links)
const FooterLink = ({ href, children }) => {
    const isInternal = href.startsWith("/");
    return (
        <li>
            {isInternal ? (
                <Link to={href} className="text-gray-400 hover:text-white transition duration-300">
                    {children}
                </Link>
            ) : (
                <a href={href} className="text-gray-400 hover:text-white transition duration-300">
                    {children}
                </a>
            )}
        </li>
    );
};

// Reusable Social Icon Component
const SocialIcon = ({ href, icon }) => {
    const icons = {
        linkedin: "fa-linkedin",
        x: "fa-x-twitter", // X (formerly Twitter)
        instagram: "fa-instagram",
        facebook: "fa-facebook",
    };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 text-2xl">
            <i className={`fab ${icons[icon]}`}></i>
        </a>
    );
};

export default Footer;
