/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async redirects() {
    return [
      {
        source: "/thequiet",
        destination: "http://legacy.imogenheap.com/thequiet",
        permanent: true,
      },
      {
        source: "/thehappysong",
        destination: "http://legacy.imogenheap.com/thehappysong",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "http://legacy.imogenheap.com/contact",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "http://legacy.imogenheap.com/ai",
        permanent: true,
      },
      {
        source: "/lastnightofanempire",
        destination: "http://legacy.imogenheap.com/lastnightofanempire",
        permanent: true,
      },
      {
        source: "/login.php",
        destination: "http://legacy.imogenheap.com/login.php",
        permanent: true,
      },
      {
        source: "/magicme",
        destination: "http://legacy.imogenheap.com/magicme/",
        permanent: true,
      },
      {
        source: "/newsletter",
        destination: "http://legacy.imogenheap.com/newsletter",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "http://legacy.imogenheap.com/profile",
        permanent: true,
      },
      {
        source: "/thankyou",
        destination: "http://legacy.imogenheap.com/thankyou",
        permanent: true,
      },
      {
        source: "/cello",
        destination: "http://legacy.imogenheap.com/cello",
        permanent: true,
      },
      {
        source: "/charity",
        destination: "http://legacy.imogenheap.com/charity",
        permanent: true,
      },
      {
        source: "/earth/",
        destination: "http://legacy.imogenheap.com/earth/",
        permanent: true,
      },
      {
        source: "/heapsong5",
        destination: "http://legacy.imogenheap.com/heapsong5",
        permanent: true,
      },
      {
        source: "/juliet",
        destination: "http://legacy.imogenheap.com/juliet",
        permanent: true,
      },
      {
        source: "/listeningchair",
        destination: "http://legacy.imogenheap.com/listeningchair",
        permanent: true,
      },
      {
        source: "/live4capetown",
        destination: "http://legacy.imogenheap.com/live4capetown",
        permanent: true,
      },
      {
        source: "/live4sendai",
        destination: "http://legacy.imogenheap.com/live4sendai",
        permanent: true,
      },
      {
        source: "/livestreams",
        destination: "http://legacy.imogenheap.com/livestreams",
        permanent: true,
      },
      {
        source: "/royalalberthome",
        destination: "http://legacy.imogenheap.com/royalalberthome",
        permanent: true,
      },
      {
        source: "/thanks",
        destination: "http://legacy.imogenheap.com/thanks",
        permanent: true,
      },
      {
        source: "/thegloves",
        destination: "http://legacy.imogenheap.com/thegloves",
        permanent: true,
      },
      {
        source: "/vote",
        destination: "http://legacy.imogenheap.com/vote",
        permanent: true,
      },
    ];
  },
};
