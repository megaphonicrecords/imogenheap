import React from 'react';
import { FaSquareFacebook, FaXTwitter, FaBandcamp, FaSquareYoutube, FaInstagram, FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { BsPassportFill } from "react-icons/bs";

const Footer = () => {
    const currentYear = new Date().getFullYear();
return (
    <footer className="py-8 text-center">
    <div className="container mx-auto flex gap-x-2 justify-center items-center text-zinc-600">
    <a href="https://www.facebook.com/imogenheap" rel="noopener noreferrer" className="hover:text-white"><FaSquareFacebook/></a>
    <a href="https://www.instagram.com/imogenheap/" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
    <a href="https://twitter.com/imogenheap" rel="noopener noreferrer" className="hover:text-white"><FaXTwitter /></a>
    <a href="https://www.youtube.com/imogenheap" rel="noopener noreferrer" className="hover:text-white"><FaSquareYoutube /></a>
    <a href="https://open.spotify.com/artist/6Xb4ezwoAQC4516kI89nWz" rel="noopener noreferrer" className="hover:text-white"><FaSpotify /></a>
    <a href="https://music.apple.com/gb/artist/imogen-heap/22873602" rel="noopener noreferrer" className="hover:text-white"><SiApplemusic /></a>
    <a href="https://imogenheap.bandcamp.com" rel="noopener noreferrer" className="hover:text-white"><FaBandcamp /></a>
    <a href="https://prerelease.creativepassport.net/page/6113890d-f6db-4b4d-838a-f811d60f4409/977a55e6-6e35-4dab-9400-923626f06545" rel="noopener noreferrer" className="hover:text-white"><BsPassportFill /></a>
    </div>
    <div className="container mx-auto mt-4">
        <a href="http://imogenheap.com/policy" rel="noopener noreferrer" className="mr-4 text-sm font-extralight hover:font-normal dotLink">Privacy Policy</a>
        <a href="http://imogenheap.com/contact" rel="noopener noreferrer" className="text-sm font-extralight hover:font-normal dotLink">Contact</a>
    </div>
    <div className="container mx-auto mt-4">
    <p className="text-zinc-600 text-center text-sm font-light">&copy; {currentYear} Megaphonic</p>
    </div>
</footer>
);
}

export default Footer;