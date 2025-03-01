import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownDesktopRef = useRef(null);
    const dropdownMobileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownDesktopRef.current && !dropdownDesktopRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (dropdownMobileRef.current && !dropdownMobileRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="absolute top-0 left-0 w-full bg-transparent p-4 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <a href="#" className="flex flex-row items-center">
                    <div className="bg-blue-400 rounded-full w-12 h-12 mx-3 flex items-center justify-center">
                        <p className="text-lg font-bold text-white">M</p>
                    </div>
                    <p className="text-white">Martin Muye Munga</p>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {/* About Dropdown */}
                    <div className="relative" ref={dropdownDesktopRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1 text-lg text-white hover:text-blue-400 transition duration-300"
                        >
                            About <ChevronDown size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg p-2 z-50">
                                <DropdownLink href="#profile">Profile</DropdownLink>
                                <DropdownLink href="#education">Education</DropdownLink>

                                <DropdownLink href="#skills">Experience & Skills</DropdownLink>
                            </div>
                        )}
                    </div>

                    {/* Contact Link (White in Desktop) */}
                    <CustomNavLink href="#contact" className="text-white">Contact</CustomNavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-white"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 mt-4 bg-white p-4 rounded-lg w-full text-black">
                    {/* About Dropdown for Mobile */}
                    <div className="text-center" ref={dropdownMobileRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1 text-lg text-black hover:text-blue-400 transition duration-300"
                        >
                            About <ChevronDown size={18} />
                        </button>

                        {dropdownOpen && (
                            <div className="mt-2 bg-white text-black shadow-lg rounded-lg p-2 min-w-[200px]">
                                <DropdownLink href="#introduction">Introduction</DropdownLink>
                                <DropdownLink href="#education">Education</DropdownLink>

                                <DropdownLink href="#experience">Experience & Skills</DropdownLink>
                            </div>
                        )}
                    </div>

                    {/* Contact Link (Black in Mobile) */}
                    <CustomNavLink href="#contact" className="text-black">Contact</CustomNavLink>
                </div>
            )}
        </nav>
    );
};

// Custom Styled Anchor Links
const CustomNavLink = ({ href, children, className }) => (
    <a
        href={href}
        className={`text-lg transition duration-300 hover:text-blue-400 ${className}`}
    >
        {children}
    </a>
);

// Dropdown Link Styling
const DropdownLink = ({ href, children }) => (
    <a
        href={href}
        className="block px-4 py-2 text-black hover:bg-gray-200 transition duration-300 rounded-md"
    >
        {children}
    </a>
);

export default Navbar;
