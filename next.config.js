/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async redirects() {
    return [
      {
        source: "/thequiet",
        destination: "https://legacy.imogenheap.com/thequiet",
        permanent: true,
      },
      {
        source: "/thehappysong",
        destination: "https://legacy.imogenheap.com/thehappysong",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "https://legacy.imogenheap.com/contact",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "https://legacy.imogenheap.com/ai",
        permanent: true,
      },
      {
        source: "/lastnightofanempire",
        destination: "https://legacy.imogenheap.com/lastnightofanempire",
        permanent: true,
      },
      {
        source: "/login.php",
        destination: "https://legacy.imogenheap.com/login.php",
        permanent: true,
      },
      {
        source: "/magicme",
        destination: "https://legacy.imogenheap.com/magicme",
        permanent: true,
      },
      {
        source: "/newsletter",
        destination: "https://legacy.imogenheap.com/newsletter",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "https://legacy.imogenheap.com/profile",
        permanent: true,
      },
      {
        source: "/thankyou",
        destination: "https://legacy.imogenheap.com/thankyou",
        permanent: true,
      },
      {
        source: "/cello",
        destination: "https://legacy.imogenheap.com/cello",
        permanent: true,
      },
      {
        source: "/charity",
        destination: "https://legacy.imogenheap.com/charity",
        permanent: true,
      },
      {
        source: "/earth",
        destination: "https://legacy.imogenheap.com/earth",
        permanent: true,
      },
      {
        source: "/heapsong5",
        destination: "https://legacy.imogenheap.com/heapsong5",
        permanent: true,
      },
      {
        source: "/juliet",
        destination: "https://legacy.imogenheap.com/juliet",
        permanent: true,
      },
      {
        source: "/listeningchair",
        destination: "https://legacy.imogenheap.com/listeningchair",
        permanent: true,
      },
      {
        source: "/live4capetown",
        destination: "https://legacy.imogenheap.com/live4capetown",
        permanent: true,
      },
      {
        source: "/live4sendai",
        destination: "https://legacy.imogenheap.com/live4sendai",
        permanent: true,
      },
      {
        source: "/livestreams",
        destination: "https://legacy.imogenheap.com/livestreams",
        permanent: true,
      },
      {
        source: "/royalalberthome",
        destination: "https://legacy.imogenheap.com/royalalberthome",
        permanent: true,
      },
      {
        source: "/thanks",
        destination: "https://legacy.imogenheap.com/thanks",
        permanent: true,
      },
      {
        source: "/thegloves",
        destination: "https://legacy.imogenheap.com/thegloves",
        permanent: true,
      },
      {
        source: "/vote",
        destination: "https://legacy.imogenheap.com/vote",
        permanent: true,
      },
    ];
  },
};
