import React from "react";
import {
  FaTeeth,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import styles from "../styles";

const Footer = () => {
  const footerLinks = [
    {
      title: "Useful Links",
      links: [
        {
          name: "Content",
          link: "https://www.hoobank.com/content/",
        },
        {
          name: "How it Works",
          link: "https://www.hoobank.com/how-it-works/",
        },
        {
          name: "Create",
          link: "https://www.hoobank.com/create/",
        },
        {
          name: "Explore",
          link: "https://www.hoobank.com/explore/",
        },
        {
          name: "Terms & Services",
          link: "https://www.hoobank.com/terms-and-services/",
        },
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Help Center",
          link: "https://www.hoobank.com/help-center/",
        },
        {
          name: "Partners",
          link: "https://www.hoobank.com/partners/",
        },
        {
          name: "Suggestions",
          link: "https://www.hoobank.com/suggestions/",
        },
        {
          name: "Blog",
          link: "https://www.hoobank.com/blog/",
        },
        {
          name: "Newsletters",
          link: "https://www.hoobank.com/newsletters/",
        },
      ],
    },
    {
      title: "Partner",
      links: [
        {
          name: "Our Partner",
          link: "https://www.hoobank.com/our-partner/",
        },
        {
          name: "Become a Partner",
          link: "https://www.hoobank.com/become-a-partner/",
        },
      ],
    },
  ];
  const socialMedia = [
    {
      id: "social-media-1",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/",
    },
    {
      id: "social-media-2",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/",
    },
    {
      id: "social-media-3",
      icon: <FaTwitter />,
      link: "https://www.twitter.com/",
    },
    {
      id: "social-media-4",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/",
    },
  ];
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <FaTeeth className="w-[266px] h-[72.14px] object-contain" />
          <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
            Optimal Oral Care: Unveiling the Exceptional Service at Our Dental
            Clinic.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className="font-display font-medium text-[18px] leading-[27px] text-primary">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-primary cursor-pointer hover:text-lg transition-all ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-primary">
          Copyright Ⓒ 2022 RejoDevelopers. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <div
              key={social.id}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            >
              {social.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
