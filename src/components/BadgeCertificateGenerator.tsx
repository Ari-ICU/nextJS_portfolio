"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { inject, track } from "@vercel/analytics";

// Badge and certificate data
const badges = [
  {
    id: "1",
    title: "Fortinet NSE 4 Certification",
    description: "Completed Fortinet NSE 4 Network Security Professional training",
    image: "TIC.png",
    type: "image",
  },
  {
    id: "3",
    title: "AWS Academy Graduate - AWS Academy Machine Learning Foundations",
    description: "Certified in designing scalable AWS cloud architectures",
    image: "aws-ml.png",
    type: "image",
  },
  {
    id: "4",
    title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
    description: "Earners of this badge have taken the AWS Academy Cloud Foundations course.",
    image: "aws-cloud-foundation.png",
    type: "image",
  },
  {
    id: "5",
    title: "AWS Academy Data Engineering",
    description: "Completed AWS Academy Data Engineering course (40 hours)",
    image: "aws-data-engineering.png",
    type: "image",
  },
];

const certificates = [
  {
    id: "1",
    title: "AWS Academy Graduate – Data Engineering",
    description: "Completed the AWS Academy Data Engineering course (40 hours), focusing on scalable data pipelines and cloud analytics.",
    pdf: "AWS_Academy_Graduate___AWS_Academy_Data_Engineering_Badge20250222-28-rl9p9q.pdf",
    image: "aws.png",
    badgeUrl: "https://www.credly.com/golnTpjCN",
    type: "pdf",
  },
  {
    id: "2",
    title: "AWS Academy Graduate – Machine Learning Foundations",
    description: "Completed the AWS Machine Learning Foundations course, gaining practical knowledge in ML concepts and AWS ML services.",
    pdf: "Aws-certificate/AWS_Academy_Graduate_AWS_Academy_Machine_Learning_Foundations_Badge20250209.pdf",
    image: "aws1.png",
    badgeUrl: "https://www.credly.com/",
    type: "pdf",
  },
  {
    id: "3",
    title: "AWS Academy Graduate – Cloud Foundations",
    description: "Successfully completed the AWS Academy Cloud Foundations course, exploring core cloud services and architecture.",
    pdf: "Aws-certificate/AWS_Academy_Graduate_AWS_Academy_Cloud_Foundations_Badge20250209.pdf",
    image: "aws2.png",
    badgeUrl: "https://www.credly.com/",
    type: "pdf",
  },
  {
    id: "4",
    title: "Course Completion – Frontend Development with React",
    description: "Finished an instructor-led React.js frontend development course covering component architecture, hooks, and state management.",
    pdf: "Course_Completion_Certificate.pdf",
    image: "fortinet.png",
    badgeUrl: "https://www.credly.com/",
    type: "pdf",
  },
  {
    id: "5",
    title: "Course Completion – JavaScript Advanced",
    description: "Completed an advanced course on JavaScript fundamentals, ES6+, async programming, and DOM manipulation.",
    pdf: "Course_Completion_Certificate_JS.pdf",
    image: "fortinet1.png",
    badgeUrl: "https://www.credly.com/",
    type: "pdf",
  },
];

export default function BadgeCertificateGenerator() {
  const badgeScrollRef = useRef(null);
  const certificateScrollRef = useRef(null);
  const [showPdfModal, setShowPdfModal] = useState(null);

  // Analytics tracking
  useEffect(() => {
    inject();
    track("Badges Certificates Viewed");
  }, []);

  // Download badge or PDF
  type Badge = typeof badges[number];
  type Certificate = typeof certificates[number];
  type Achievement = Badge | Certificate;

  function isCertificate(achievement: Achievement): achievement is Certificate {
    return (achievement as Certificate).pdf !== undefined;
  }

  const downloadAsset = async (achievement: Achievement) => {
    try {
      const filePath = isCertificate(achievement)
        ? `/assets/${achievement.pdf}`
        : `/assets/${achievement.image}`;
      const fileName = isCertificate(achievement)
        ? `${achievement.title.replace(/\s+/g, "_")}_Certificate.pdf`
        : `${achievement.title.replace(/\s+/g, "_")}_Badge.png`;
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("File not found");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      track(`${isCertificate(achievement) ? "Certificate" : "Badge"} Downloaded`, {
        title: achievement.title,
      });
    } catch (error) {
      console.error("Failed to download asset:", error);
      alert("Failed to download. Please try again.");
    }
  };

  // Share badge
  const shareBadge = (achievement: Achievement) => {
    const shareText = `I earned the ${achievement.title} badge! ${
      achievement.description
    }${
      "badgeUrl" in achievement && achievement.badgeUrl
        ? ` Verify at ${achievement.badgeUrl}`
        : ""
    }`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Achievement Badge",
          text: shareText,
          url:
            "badgeUrl" in achievement && achievement.badgeUrl
              ? achievement.badgeUrl
              : window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Share this: " + shareText);
    }
    track("Badge Shared", { title: achievement.title });
  };

  // View PDF in modal
  const viewPdf = (pdfPath: string) => {
    setShowPdfModal(`/assets/${pdfPath}`);
  };

  return (
    <motion.section
      viewport={{ once: true }}
      id="badges-certificates"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-6 sm:py-8 lg:py-12"
      role="region"
      aria-labelledby="badges-certificates-title"
    >
      <div className="w-full max-w-[90rem] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full text-center space-y-3 sm:space-y-4 px-2 sm:px-4"
        >
          <h2
            id="badges-certificates-title"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900"
          >
            Badges & Certificates
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-xl mx-auto">
            Explore my Fortinet, AWS, and Cisco certifications, showcasing expertise in network security, cloud computing, and data engineering.
          </p>
        </motion.div>

        {/* Badges Section */}
        <div className="w-full px-2 sm:px-4">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            Badges
          </h3>
          <motion.div
            ref={badgeScrollRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full overflow-x-auto py-3 sm:py-4 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
            role="list"
            aria-label="Certification badges"
          >
            <div className="flex gap-3 sm:gap-4">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[140px] sm:min-w-[180px] lg:min-w-[220px] max-w-[min(90vw,220px)] bg-white rounded-xl shadow-lg p-3 sm:p-4 flex flex-col items-center snap-center"
                  role="listitem"
                >
                  <Image
                    src={`/assets/${badge.image}`}
                    alt={`${badge.title} badge`}
                    width={100}
                    height={100}
                    className="object-contain w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                    loading="lazy"
                  />
                  <div className="mt-2 sm:mt-3 text-center space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 line-clamp-2">
                      {badge.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                      {badge.description}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-3 flex gap-1 sm:gap-2">
                    <motion.button
                      onClick={() => shareBadge(badge)}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 sm:p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition"
                      aria-label={`Share ${badge.title} badge`}
                    >
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.button>
                    <motion.button
                      onClick={() => downloadAsset(badge)}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 sm:p-2 bg-amber-600 rounded-full hover:bg-amber-700 transition"
                      aria-label={`Download ${badge.title} badge image`}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certificates Section */}
        <div className="w-full px-2 sm:px-4">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            Certificates
          </h3>
          <motion.div
            ref={certificateScrollRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full overflow-x-auto py-3 sm:py-4 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
            role="list"
            aria-label="Certification certificates"
          >
            <div className="flex gap-3 sm:gap-4">
              {certificates.map((certificate) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[140px] sm:min-w-[180px] lg:min-w-[220px] max-w-[min(90vw,220px)] bg-white rounded-xl shadow-lg p-3 sm:p-4 flex flex-col items-center snap-center"
                  role="listitem"
                >
                  <Image
                    src={`/assets/${certificate.image}`}
                    alt={`${certificate.title} certificate`}
                    width={100}
                    height={100}
                    className="object-contain w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                    loading="lazy"
                  />
                  <div className="mt-2 sm:mt-3 text-center space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 line-clamp-2">
                      {certificate.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                      {certificate.description}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-3 flex gap-1 sm:gap-2 flex-wrap justify-center">
                    <motion.button
                      onClick={() => shareBadge(certificate)}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 sm:p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition"
                      aria-label={`Share ${certificate.title} certificate`}
                    >
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.button>
                    <motion.button
                      onClick={() => viewPdf(certificate.pdf)}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 sm:p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition"
                      aria-label={`View ${certificate.title} certificate`}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => downloadAsset(certificate)}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 sm:p-2 bg-amber-600 rounded-full hover:bg-amber-700 transition"
                      aria-label={`Download ${certificate.title} certificate`}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </motion.button>
                    {certificate.badgeUrl && (
                      <motion.a
                        href={certificate.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 sm:p-2 bg-amber-500 rounded-full hover:bg-amber-600 transition"
                        aria-label={`Verify ${certificate.title} badge on Credly`}
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          role="dialog"
          aria-label="PDF viewer"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-2 sm:p-4 w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-3xl h-[80vh] sm:h-[85vh] relative"
          >
            <button
              onClick={() => setShowPdfModal(null)}
              className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1.5 sm:p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              aria-label="Close PDF viewer"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src={showPdfModal}
              className="w-full h-full rounded-lg"
              title="Certificate PDF"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}