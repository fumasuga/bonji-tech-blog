"use client"
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Suspense, useEffect, useState } from "react";

const ProfileImage = () => {
  const [isDark] = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const image = (
    <Image
      src="/favicon/egg-fried.svg"
      alt="Fuma Suga Profile Picture"
      width={160}
      height={160}
      className={`size-24 sm:size-32 md:size-40 mb-4 md:mb-0 md:mr-9 ${isDark ? "invert" : ""}`}
    />
  );
  return (
    <div className="w-md ml-2 mr-5 flex items-center justify-center">
      <Suspense fallback={image}>
        {image}
      </Suspense>
    </div>
  );
};

export default ProfileImage;
